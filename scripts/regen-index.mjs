#!/usr/bin/env node
// 改了 kubejs/ config/ 之后跑这个，重新生成 index.toml 并回写 pack.toml 的哈希。
// 等价于 packwiz refresh，但不需要装 packwiz。
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const ROOT = process.cwd();
const sha256 = (b) => crypto.createHash('sha256').update(b).digest('hex');

const SKIP_DIRS = new Set(['mods', '.git', '.github', 'docs', 'modpack-docs', 'scripts', 'saves', 'logs',
  'backups', 'crash-reports', 'screenshots', 'xaero', 'local', 'PCL', 'debug', '.cache', '.probe']);
const SKIP_ROOT_FILES = new Set(['pack.toml', 'index.toml', 'README.md', 'DEVELOPMENT.md', 'CHANGELOG.md',
  'LICENSE', 'modlist.md', '.gitignore', '.gitattributes', '.packwizignore']);
const OWN_JAR = /^(MaixrCore|entropy_tech|JEIGuess|skilled_craftsmaid|MaixrsPhotoChat)-/;

const files = [];
function collect(absDir, relDir) {
  for (const e of fs.readdirSync(absDir, { withFileTypes: true })) {
    const abs = path.join(absDir, e.name);
    const rel = relDir ? relDir + '/' + e.name : e.name;
    if (e.isDirectory()) {
      if (SKIP_DIRS.has(e.name)) continue;
      if (e.name.startsWith('_deleted') || e.name.startsWith('_backup') || e.name.startsWith('assets.bak')) continue;
      collect(abs, rel);
    } else {
      if (!relDir && SKIP_ROOT_FILES.has(e.name)) continue;
      if (/\.(bak|disabled)$/.test(e.name) || /\.bak[_-]/.test(e.name)) continue;
      if (/\.(mp4|mov)$/i.test(e.name)) continue;
      if (rel.startsWith('config/inventoryprofilesnext/') && rel.split('/').length > 2) continue;
      if (rel.startsWith('config/jei/world/')) continue;
      if (rel === 'config/ae2webintegration/ae2webintegration.toml') continue;
      if (/^config\/ae2_recent_search/.test(rel)) continue;
      files.push(rel);
    }
  }
}
collect(ROOT, '');

// mods/ 只收元数据 + 自有 jar
const modsAbs = path.join(ROOT, 'mods');
if (fs.existsSync(modsAbs)) {
  for (const f of fs.readdirSync(modsAbs)) {
    if (f.endsWith('.pw.toml') || OWN_JAR.test(f)) files.push('mods/' + f);
  }
}

const entries = ['hash-format = "sha256"', ''];
let total = 0;
for (const f of [...new Set(files)].sort()) {
  const buf = fs.readFileSync(path.join(ROOT, f));
  total += buf.length;
  entries.push('[[files]]', 'file = ' + JSON.stringify(f));
  if (f.startsWith('mods/') && f.endsWith('.pw.toml')) entries.push('metafile = true');
  entries.push('hash = ' + JSON.stringify(sha256(buf)), '');
}
fs.writeFileSync(path.join(ROOT, 'index.toml'), entries.join('\n'), 'utf8');
const idxBuf = fs.readFileSync(path.join(ROOT, 'index.toml'));

const packText = fs.readFileSync(path.join(ROOT, 'pack.toml'), 'utf8')
  .replace(/^hash = "[0-9a-f]{64}"/m, 'hash = "' + sha256(idxBuf) + '"');
fs.writeFileSync(path.join(ROOT, 'pack.toml'), packText, 'utf8');

console.log('✓ index.toml: ' + (files.length) + ' 文件 / ' + (total / 1048576).toFixed(2) + ' MB');
console.log('✓ pack.toml 哈希已更新');
