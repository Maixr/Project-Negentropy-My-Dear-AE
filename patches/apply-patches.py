# -*- coding: utf-8 -*-
"""
Project Negentropy — 本地模组补丁（唯一入口）

为什么需要这个文件：
  整合包用 packwiz 分发，mods/*.jar 由 mods/*.pw.toml 里的 URL 下载，
  `packwiz update` / `packwiz refresh` 会按哈希覆盖这些 jar。
  直接把 jar 改掉，下次一更新补丁就没了；而且玩家下载到的仍是坏包。
  所以所有字节码补丁集中到这里：可重复应用、可检查、可精确回滚。

用法（在仓库根目录执行）：
  python patches/apply-patches.py            # 应用全部补丁（幂等）
  python patches/apply-patches.py --check    # 只检查：全部就绪=0，否则=1
  python patches/apply-patches.py --revert   # 还原（优先用 originals/ 做字节级精确还原）
  python patches/apply-patches.py --force    # 游戏运行时也强行改（不推荐）

新增补丁：在 PATCHES 里加一项，写清 original_sha256 / why / probe / op 即可。
"""
import argparse
import hashlib
import io
import os
import shutil
import struct
import subprocess
import sys
import tempfile
import zipfile

# Windows 控制台默认 GBK；个别符号编码不了时降级为替换字符，别让脚本崩
try:
    sys.stdout.reconfigure(errors="replace")
except Exception:
    pass

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
MODS = os.path.join(ROOT, "mods")
ORIG_DIR = os.path.join(HERE, "originals")   # 未打补丁的原始 jar（--revert 用，不入库）

# ───────────────────────── 通用工具 ─────────────────────────
SIZES = {3: 4, 4: 4, 5: 8, 6: 8, 7: 2, 8: 2, 9: 4, 10: 4, 11: 4,
         12: 4, 15: 3, 16: 2, 17: 4, 18: 4, 19: 2, 20: 2}


def sha256_path(p):
    h = hashlib.sha256()
    with open(p, "rb") as f:
        for b in iter(lambda: f.read(1 << 20), b""):
            h.update(b)
    return h.hexdigest()


def rewrite_utf8(b, pairs):
    """重写 class 的 CONSTANT_Utf8。常量池索引不变，故所有引用仍然有效。"""
    if b[:4] != b"\xca\xfe\xba\xbe":
        return b, 0
    cp_count = int.from_bytes(b[8:10], "big")
    out = bytearray(b[:10])
    i, idx, changed = 10, 1, 0
    while idx < cp_count:
        tag = b[i]
        if tag == 1:
            ln = int.from_bytes(b[i + 1:i + 3], "big")
            raw = b[i + 3:i + 3 + ln]
            new = raw
            for old, rep in pairs:
                if old in new:
                    new = new.replace(old, rep)
                    changed += 1
            if new == raw:
                out += b[i:i + 3 + ln]
            else:
                out += bytes([1]) + len(new).to_bytes(2, "big") + new
            i += 3 + ln
        else:
            sz = SIZES.get(tag)
            if sz is None:
                raise ValueError("未知常量池 tag %d" % tag)
            out += b[i:i + 1 + sz]
            i += 1 + sz
            if tag in (5, 6):
                idx += 1
        idx += 1
    out += b[i:]
    return bytes(out), changed


def rewrite_jar(jar_path, fn):
    """fn(name, data) -> (data, changed)"""
    zin = zipfile.ZipFile(jar_path)
    buf = io.BytesIO()
    touched = 0
    with zipfile.ZipFile(buf, "w", zipfile.ZIP_DEFLATED, compresslevel=6) as zout:
        for it in zin.infolist():
            data = zin.read(it.filename)
            if it.filename.endswith(".class"):
                new, n = fn(it.filename, data)
                if n:
                    data = new
                    touched += 1
            zout.writestr(it, data)
    zin.close()
    return buf.getvalue(), touched


def java_running():
    try:
        for exe in ("java.exe", "javaw.exe"):
            o = subprocess.run(["tasklist", "/FI", "IMAGENAME eq " + exe],
                               capture_output=True, text=True, errors="ignore").stdout
            if exe in o:
                return True
    except Exception:
        return True
    return False


def write_bytes(jar_path, payload):
    """同目录临时文件 + 原子替换；被 JVM 占用时给出明确提示。"""
    d = os.path.dirname(jar_path)
    fd, tmp = tempfile.mkstemp(suffix=".jar", dir=d)
    os.close(fd)
    with open(tmp, "wb") as f:
        f.write(payload)
    return swap_in(tmp, jar_path)


def swap_in(src, dst):
    import time
    for attempt in range(3):
        try:
            os.replace(src, dst)
            return True
        except PermissionError as e:
            if attempt == 2:
                try:
                    os.remove(src)
                except OSError:
                    pass
                print("    [XX] 写回失败：%s" % e)
                print("         游戏/Java 进程正占用该 jar，请完全退出游戏后重试。")
                return False
            time.sleep(1.5)
    return False


# ───────────────────────── 补丁定义 ─────────────────────────
MEST_JAR = "mesplicedterminal-0.0.3.0.jar"
MEST_ORIG_SHA = "b394f7e7f93b22c2e53e2bc96703973d02406ec88bf625f94a247ef13af900d5"
MEST_MOVES = [
    (b"com/moakiee/ae2lt/client/TextureToggleButton",
     b"com/moakiee/ae2lt/client/widgets/TextureToggleButton"),
    (b"com/moakiee/ae2lt/client/FrequencyBindingClient",
     b"com/moakiee/ae2lt/client/frequency/FrequencyBindingClient"),
]
MEST_WHY = chr(10).join([
    "ae2lt 2.1.2-beta4 把 TextureToggleButton / FrequencyBindingClient 移进了",
    "client.widgets / client.frequency，而 MEST 0.0.3.0 仍按旧包路径引用：",
    "打开 ME 拼接终端时 NoClassDefFoundError，客户端被踢出。",
    "改包路径即可，ae2lt 版本保持不动。",
])

BATCH_JAR = "ae2-batchcraft-1.21.1-1.0.3-neoforge.jar"
BATCH_ORIG_SHA = "dcfcb3117b5b9f5cbaeb73016837068093a9971682e0db7c8b871dd7ccc571a9"
BATCH_CLS = "cn/ae2bc/mixin/PatternEncodingTermMenuMixin.class"
BATCH_OLD_ID, BATCH_NEW_ID = 30000, 30500
BATCH_WHY = chr(10).join([
    "ae2-batchcraft 与 recursiveae2patternprovider 都向 PatternEncodingTermMenu",
    "注入 @GuiSync(30000)，菜单构造时抛 \"declares the same sync id twice\"。",
    "WETMenu / TianshuPatternEncodingTermMenu 继承同一基类，所以三个菜单名都报。",
    "把 batchcraft 的 id 改成全包未被占用的 30500。",
])


def mest_op(direction):
    """direction>0 应用（旧→新）；<0 还原（新→旧）。"""
    pairs = MEST_MOVES if direction > 0 else [(b, a) for a, b in MEST_MOVES]

    def fn(name, data):
        return rewrite_utf8(data, pairs)
    return fn


def mest_probe(jar_path):
    a, b = MEST_MOVES[0]
    with zipfile.ZipFile(jar_path) as z:
        cls = [n for n in z.namelist() if n.endswith(".class")]
        has_old = any(a in z.read(n) for n in cls)
        has_new = any(b in z.read(n) for n in cls)
    return has_old, has_new


def batch_op(direction):
    old_id = BATCH_OLD_ID if direction > 0 else BATCH_NEW_ID
    new_id = BATCH_NEW_ID if direction > 0 else BATCH_OLD_ID
    pat = bytes([3]) + struct.pack(">i", old_id)
    rep = bytes([3]) + struct.pack(">i", new_id)

    def fn(name, data):
        if name != BATCH_CLS:
            return data, 0
        n = data.count(pat)
        if n != 1:
            return data, 0
        return data.replace(pat, rep), 1
    return fn


def batch_probe(jar_path):
    with zipfile.ZipFile(jar_path) as z:
        if BATCH_CLS not in z.namelist():
            return False, False
        d = z.read(BATCH_CLS)
    p_old = bytes([3]) + struct.pack(">i", BATCH_OLD_ID)
    p_new = bytes([3]) + struct.pack(">i", BATCH_NEW_ID)
    return (p_old in d), (p_new in d)


PATCHES = [
    {
        "id": "mesplicedterminal-ae2lt-package-move",
        "jar": MEST_JAR,
        "original_sha256": MEST_ORIG_SHA,
        "why": MEST_WHY,
        "probe": mest_probe,
        "op": mest_op,
    },
    {
        "id": "ae2-batchcraft-guisync-30000",
        "jar": BATCH_JAR,
        "original_sha256": BATCH_ORIG_SHA,
        "why": BATCH_WHY,
        "probe": batch_probe,
        "op": batch_op,
    },
]


# ───────────────────────── 主流程 ─────────────────────────
def run(mode, force):
    if not os.path.isdir(MODS):
        print("[XX] 找不到 mods 目录：%s" % MODS)
        return 2
    if mode != "check" and java_running() and not force:
        print("[!!] 检测到 Java 进程正在运行。请先完全退出游戏，或用 --force。")
        return 2

    pending = unknown = 0
    for p in PATCHES:
        jar = os.path.join(MODS, p["jar"])
        print(chr(10) + "== " + p["id"])
        if not os.path.exists(jar):
            print("   跳过：mods 里没有 %s" % p["jar"])
            pending += 1
            continue

        dir_is_revert = (mode == "revert")
        has_old, has_new = p["probe"](jar)
        done = (has_old and not has_new) if dir_is_revert else (has_new and not has_old)
        if done:
            print("   已是原始状态（无需处理）" if dir_is_revert else "   已应用（无需处理）")
            continue
        if not has_old and not has_new:
            print("   [!!] 无法识别该版本（模组可能已更新），请人工确认补丁是否仍适用")
            unknown += 1
            continue
        if mode == "check":
            print("   未应用（需要打补丁）")
            pending += 1
            continue

        print("   原因：" + p["why"].replace(chr(10), chr(10) + "   "))

        if dir_is_revert and os.path.isdir(ORIG_DIR):
            src = os.path.join(ORIG_DIR, p["jar"])
            if os.path.exists(src):
                fd, tmp = tempfile.mkstemp(suffix=".jar", dir=MODS)
                os.close(fd)
                shutil.copy2(src, tmp)
                if not swap_in(tmp, jar):
                    pending += 1
                    continue
                got = sha256_path(jar)
                if got == p["original_sha256"]:
                    print("   [OK] 已从 originals/ 字节级精确还原（%d B）" % os.path.getsize(jar))
                else:
                    print("   [!!] 已还原但哈希与记录不符：%s" % got)
                    unknown += 1
                continue

        payload, touched = rewrite_jar(jar, p["op"](1 if not dir_is_revert else -1))
        if touched == 0:
            print("   [XX] 未命中任何类，补丁可能已不适用")
            unknown += 1
            continue
        if not write_bytes(jar, payload):
            pending += 1
            continue
        has_old2, has_new2 = p["probe"](jar)
        ok = (has_old2 and not has_new2) if dir_is_revert else (has_new2 and not has_old2)
        print("   %s %s（改写 %d 个类，现 %d B）" % (
            "[OK]" if ok else "[XX]",
            "已还原" if dir_is_revert else "已应用",
            touched, os.path.getsize(jar)))
        if not ok:
            unknown += 1

    print()
    if mode == "check":
        print("结论：需要打补丁 %d 项，无法识别 %d 项" % (pending, unknown))
    else:
        print("结论：未完成 %d 项，无法识别 %d 项" % (pending, unknown))
    return 0 if (pending == 0 and unknown == 0) else 1


def main():
    ap = argparse.ArgumentParser(description="Project Negentropy 本地模组补丁")
    g = ap.add_mutually_exclusive_group()
    g.add_argument("--check", action="store_true", help="只检查，不修改")
    g.add_argument("--revert", action="store_true", help="还原所有补丁")
    ap.add_argument("--force", action="store_true", help="游戏运行时也强行修改")
    a = ap.parse_args()
    mode = "check" if a.check else ("revert" if a.revert else "apply")
    return run(mode, a.force)


if __name__ == "__main__":
    sys.exit(main())
