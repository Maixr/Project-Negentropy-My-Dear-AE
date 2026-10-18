#!/usr/bin/env node
// 重新生成 index.toml 并回写 pack.toml 的哈希（等价 packwiz refresh，但不需要装 packwiz）。
//
// ★ 关键设计：文件清单以 `git ls-files` 为准，而不是遍历磁盘。
//   否则会把 .gitignore 掉的东西（.mixin.out/、tlm_custom_pack/ …）写进索引，
//   本地能跑，CI 检出后必然报「引用了不存在的文件」。
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { execFileSync } from 'node:child_process';

const ROOT = process.cwd();
const sha256 = (b) => crypto.createHash('sha256').update(b).digest('hex');

// 仓库管理类文件不进整合包
const EXCLUDE = [
  /^\.github\//, /^\.gitignore$/, /^\.gitattributes$/, /^\.packwizignore$/,
  /^README\.md$/, /^DEVELOPMENT\.md$/, /^CHANGELOG\.md$/, /^LICENSE$/, /^modlist\.md$/,
  /^modpack-docs\//, /^docs\//, /^scripts\//, /^pack\.toml$/, /^index\.toml$/,
  /^sync\.bat$/,
];

// 拿到 git 实际跟踪的文件（-z 避免中文/空格路径被转义）
const raw = execFileSync('git', ['ls-files', '-z'], { cwd: ROOT, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
const tracked = raw.split('\0').filter(Boolean);

const files = tracked
  .filter((f) => !EXCLUDE.some((r) => r.test(f)))
  .filter((f) => fs.existsSync(path.join(ROOT, f)));

if (files.length === 0) {
  console.error('✗ git ls-files 没有返回任何可打包文件');
  process.exit(1);
}

const entries = ['hash-format = "sha256"', ''];
let total = 0;
for (const f of files.sort()) {
  const buf = fs.readFileSync(path.join(ROOT, f));
  total += buf.length;
  entries.push('[[files]]', 'file = ' + JSON.stringify(f));
  if (f.startsWith('mods/') && f.endsWith('.pw.toml')) entries.push('metafile = true');
  entries.push('hash = ' + JSON.stringify(sha256(buf)), '');
}

fs.writeFileSync(path.join(ROOT, 'index.toml'), entries.join('\n'), 'utf8');
const idxBuf = fs.readFileSync(path.join(ROOT, 'index.toml'));

const packPath = path.join(ROOT, 'pack.toml');
const packText = fs.readFileSync(packPath, 'utf8')
  .replace(/^hash = "[0-9a-f]{64}"/m, 'hash = "' + sha256(idxBuf) + '"');
fs.writeFileSync(packPath, packText, 'utf8');

console.log('✓ index.toml: ' + files.length + ' 文件 / ' + (total / 1048576).toFixed(2) + ' MB');
console.log('✓ pack.toml 哈希已更新');
