#!/usr/bin/env node
// 校验 config/kubejs 下的 JSON。
// 模组配置常见 JSONC（带 // 注释、尾逗号），严格 JSON.parse 会误报，
// 所以先剥掉注释和尾逗号再解析 —— 仍能抓出真正的语法错误。
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const ROOT = process.cwd();

/** 去掉字符串外的 // 与 /* *\/ 注释，以及对象/数组尾逗号 */
function lenient(text) {
  let out = '';
  let inStr = false, strCh = '', esc = false, inLine = false, inBlock = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i], n = text[i + 1];
    if (inLine) { if (c === '\n') { inLine = false; out += c; } continue; }
    if (inBlock) { if (c === '*' && n === '/') { inBlock = false; i++; } continue; }
    if (inStr) {
      out += c;
      if (esc) { esc = false; continue; }
      if (c === '\\') { esc = true; continue; }
      if (c === strCh) inStr = false;
      continue;
    }
    if (c === '"' || c === "'") { inStr = true; strCh = c; out += c; continue; }
    if (c === '/' && n === '/') { inLine = true; i++; continue; }
    if (c === '/' && n === '*') { inBlock = true; i++; continue; }
    out += c;
  }
  // 尾逗号
  return out.replace(/,(\s*[}\]])/g, '$1');
}

const raw = execFileSync('git', ['ls-files', '-z'], { cwd: ROOT, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
const files = raw.split('\0').filter(Boolean)
  .filter((f) => /\.json$/i.test(f))
  .filter((f) => /^(config|defaultconfigs|kubejs)\//.test(f))
  .filter((f) => !f.includes('/_deleted'))
  .filter((f) => fs.existsSync(path.join(ROOT, f)));

const bad = [];
for (const f of files) {
  const text = fs.readFileSync(path.join(ROOT, f), 'utf8').replace(/^\uFEFF/, '');
  try { JSON.parse(text); } catch {
    try { JSON.parse(lenient(text)); } catch (e2) { bad.push([f, e2.message]); }
  }
}

console.log('检查 JSON 文件: ' + files.length);
if (bad.length) {
  for (const [f, msg] of bad) {
    console.log('::error file=' + f + '::JSON 解析失败: ' + msg);
  }
  console.log('');
  console.log('✗ ' + bad.length + ' 个文件解析失败');
  process.exit(1);
}
console.log('✓ 全部可解析');
