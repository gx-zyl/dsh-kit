/**
 * dsh-kit 包内技能面自查（不需要 DSH 运行）。
 *
 * 校验项：
 *  1) 技能数 = 92，每个技能目录都有 SKILL.md
 *  2) 只有 skills/<name>/SKILL.md 一层会被 DSH 发现；嵌套 SKILL.md 只作为技能载荷报告
 *  3) frontmatter 无致命 legacy 键（disableModelInvocation / modelInvocable / userInvocable）
 *  4) name/description 必填，且 name 与目录名一致
 *  5) 未认可键只报告不报错（DSH 解析器忽略未知键）
 *
 * 用法：node tools/validate-package.ts
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const SKILLS = join(HERE, "..", "integrations", "deepseek-harness", "skills");
const EXPECTED = 92;

const ALLOWED = new Set(["name", "description", "whenToUse", "metadata", "disable-model-invocation", "user-invocable"]);
const LEGACY = new Set(["disableModelInvocation", "modelInvocable", "userInvocable"]);

function topKeys(fm: string): string[] {
  const keys: string[] = [];
  for (const line of fm.split(/\r?\n/)) {
    const m = /^([A-Za-z][A-Za-z0-9_-]*)\s*:/.exec(line);
    if (m) keys.push(m[1]);
  }
  return keys;
}

function fmOf(raw: string): string | undefined {
  const nl = raw.indexOf("\n");
  if (nl < 0 || raw.slice(0, nl).replace(/\r$/, "") !== "---") return undefined;
  let lineStart = nl + 1;
  for (;;) {
    const next = raw.indexOf("\n", lineStart);
    const lineEnd = next < 0 ? raw.length : next;
    if (raw.slice(lineStart, lineEnd).replace(/\r$/, "") === "---") return raw.slice(nl + 1, lineStart);
    if (next < 0) return undefined;
    lineStart = next + 1;
  }
}

function walk(dir: string, out: string[] = []): string[] {
  for (const n of readdirSync(dir)) {
    const p = join(dir, n);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (n === "SKILL.md") out.push(p);
  }
  return out;
}

const dirs = readdirSync(SKILLS).filter((n) => statSync(join(SKILLS, n)).isDirectory());
const allSkillMds = walk(SKILLS);
const discoverable = allSkillMds.filter((p) => p.slice(SKILLS.length + 1).split(/[\\/]/).length === 2);
const payload = allSkillMds.filter((p) => !discoverable.includes(p));

const problems: string[] = [];
const unknown: string[] = [];
let disableCount = 0;
let bytes = 0;

for (const d of dirs) {
  const md = join(SKILLS, d, "SKILL.md");
  let raw: string;
  try {
    raw = readFileSync(md, "utf8");
  } catch {
    problems.push(`缺 SKILL.md: ${d}`);
    continue;
  }
  bytes += Buffer.byteLength(raw);
  const fm = fmOf(raw);
  if (fm === undefined) {
    problems.push(`无 frontmatter: ${d}`);
    continue;
  }
  const keys = topKeys(fm);
  const bad = keys.filter((k) => !ALLOWED.has(k));
  const legacy = keys.filter((k) => LEGACY.has(k));
  if (bad.length) unknown.push(`${d}: ${bad.join(",")}`);
  if (legacy.length) problems.push(`legacy 键 ${legacy.join(",")}: ${d}`);
  if (!keys.includes("name")) problems.push(`缺 name: ${d}`);
  if (!keys.includes("description")) problems.push(`缺 description: ${d}`);
  if (keys.includes("disable-model-invocation")) disableCount++;
  const nameLine = /^name:\s*(.+)$/m.exec(fm);
  if (nameLine && nameLine[1].trim() !== d) problems.push(`name 与目录不一致: ${d} vs ${nameLine[1].trim()}`);
}

console.log(`技能目录数 = ${dirs.length}（期望 ${EXPECTED}）${dirs.length === EXPECTED ? " ✅" : " ❌"}`);
console.log(`可发现的 SKILL.md = ${discoverable.length}`);
console.log(`载荷型嵌套 SKILL.md = ${payload.length}`);
for (const p of payload) console.log("   · " + p.slice(SKILLS.length + 1));
console.log(`致命 frontmatter 问题 = ${problems.length}${problems.length === 0 ? " ✅" : ""}`);
for (const p of problems) console.log("  ❌ " + p);
console.log(`非致命：含未认可键的技能 = ${unknown.length}`);
for (const u of unknown) console.log("   · " + u);
console.log(`保留 disable-model-invocation 的技能 = ${disableCount}`);
console.log(`SKILL.md 正文总体量 = ${(bytes / 1024 / 1024).toFixed(2)} MB`);

process.exitCode = problems.length === 0 && dirs.length === EXPECTED ? 0 : 1;
