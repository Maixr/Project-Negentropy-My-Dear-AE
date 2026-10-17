#!/usr/bin/env node
// 校验 Packwiz 整合包完整性。CI 与本地提交前都应跑一遍。
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const ROOT = process.cwd();
const errs = [];
const warns = [];
const sha256 = (b) => crypto.createHash('sha256').update(b).digest('hex');

// ── 极简 TOML 取值（只读我们需要的几个键）──
function tomlGet(text, key) {
  const m = text.match(new RegExp('^' + key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\s*=\\s*"([^"]*)"', 'm'));
  return m ? m[1] : null;
}

// ── 1. pack.toml 结构 ──
const packPath = path.join(ROOT, 'pack.toml');
if (!fs.existsSync(packPath)) errs.push('缺少 pack.toml');
let packHash = null;
if (fs.existsSync(packPath)) {
  const t = fs.readFileSync(packPath, 'utf8');
  for (const k of ['name', 'author', 'version', 'pack-format']) {
    if (!tomlGet(t, k)) errs.push('pack.toml 缺少字段: ' + k);
  }
  packHash = tomlGet(t, 'hash');
  if (!tomlGet(t, 'minecraft')) errs.push('pack.toml [versions] 缺少 minecraft');
}

// ── 2. index.toml 与实际文件一致 ──
const indexPath = path.join(ROOT, 'index.toml');
if (!fs.existsSync(indexPath)) errs.push('缺少 index.toml');
let fileCount = 0, totalBytes = 0;
if (fs.existsSync(indexPath)) {
  const idxBuf = fs.readFileSync(indexPath);
  if (packHash && sha256(idxBuf) !== packHash) {
    errs.push('pack.toml 里的 index 哈希与 index.toml 实际内容不符（改了文件没重新生成 index？）');
  }
  const text = idxBuf.toString('utf8');
  const blocks = text.split('[[files]]').slice(1);
  for (const b of blocks) {
    const file = tomlGet(b, 'file');
    const hash = tomlGet(b, 'hash');
    if (!file || !hash) { errs.push('index.toml 有条目缺少 file/hash'); continue; }
    const p = path.join(ROOT, file);
    if (!fs.existsSync(p)) { errs.push('index 引用了不存在的文件: ' + file); continue; }
    const buf = fs.readFileSync(p);
    fileCount++; totalBytes += buf.length;
    if (sha256(buf) !== hash) errs.push('哈希不符：' + file);
    if (buf.length > 100 * 1048576) errs.push('文件超过 100MB（GitHub 上限）：' + file);
  }
}

// ── 3. mods/*.pw.toml 必需字段 ──
const modsDir = path.join(ROOT, 'mods');
let pwCount = 0;
if (fs.existsSync(modsDir)) {
  for (const f of fs.readdirSync(modsDir)) {
    if (!f.endsWith('.pw.toml')) continue;
    pwCount++;
    const t = fs.readFileSync(path.join(modsDir, f), 'utf8');
    for (const k of ['name', 'filename']) {
      if (!tomlGet(t, k)) errs.push('mods/' + f + ' 缺少 ' + k);
    }
    if (!/hash-format\s*=\s*"sha512"/.test(t)) errs.push('mods/' + f + ' 缺 sha512');
    if (!/^url\s*=\s*"/m.test(t)) errs.push('mods/' + f + ' 缺 url');
  }
}

// ── 4. KubeJS 文件名必须全小写（大写会致命崩启动）──
for (const d of ['kubejs/data', 'kubejs/assets']) {
  const base = path.join(ROOT, d);
  if (!fs.existsSync(base)) continue;
  const walk = (p) => {
    for (const e of fs.readdirSync(p, { withFileTypes: true })) {
      const full = path.join(p, e.name);
      if (/[A-Z]/.test(e.name)) errs.push('KubeJS 文件名含大写（会崩启动）: ' + path.relative(ROOT, full));
      if (e.isDirectory()) walk(full);
    }
  };
  walk(base);
}

// ── 5. 绝不能出现的东西 ──
const FORBIDDEN = [/^config\/ae2webintegration\/ae2webintegration\.toml$/, /^saves\//, /^logs\//, /^backups\//];
for (const f of (fs.existsSync(indexPath) ? fs.readFileSync(indexPath, 'utf8').split('[[files]]').slice(1).map(b => tomlGet(b, 'file')).filter(Boolean) : [])) {
  if (FORBIDDEN.some(r => r.test(f))) errs.push('不该进包的文件: ' + f);
}

// ── 输出 ──
console.log('pack.toml   : ' + (fs.existsSync(packPath) ? 'OK' : '缺失'));
console.log('index.toml  : ' + fileCount + ' 文件 / ' + (totalBytes / 1048576).toFixed(2) + ' MB');
console.log('mods 元数据 : ' + pwCount + ' 个 .pw.toml');
if (warns.length) { console.log('\n警告:'); warns.forEach(w => console.log('  ! ' + w)); }
if (errs.length) {
  console.log('\n错误 (' + errs.length + '):');
  errs.slice(0, 40).forEach(e => {
    console.log('  x ' + e);
    console.log('::error::' + e.replace(/[\r\n]/g, ' '));
  });
  process.exit(1);
}
console.log('\n✓ 校验通过');
