/**
 * dsh-kit 包内技能面自查（不需要 DSH 运行）。
 *
 * 校验项（全部计入退出码）：
 *  1) 技能数 = 92，每个技能目录都有 SKILL.md
 *  2) 只有 skills/<name>/SKILL.md 一层会被 DSH 发现；嵌套 SKILL.md 只允许 grow-dream 的模板载荷，数量与路径必须与预期一致
 *  3) frontmatter 无致命 legacy 键（disableModelInvocation / modelInvocable / userInvocable）
 *  4) name/description 必填，且 name 与目录名一致
 *  5) description 必须含中文（召回用；见 README「语言」与 CONTEXT「中文辅助」）
 *  6) 8 个用户调用型技能的名单必须与 CONTEXT D8 完全一致（disable-model-invocation 在位、无第 9 个）
 *  7) 84 个上游技能的 metadata 必须带 origin/upstream/snapshot，且与 references/upstream-sources.md 的引用总表一致
 *  8) 正文内指向包内相对路径的 markdown 链接与反引号路径必须存在（防死链）
 *  9) 未认可键只报告不报错（DSH 解析器忽略未知键，见 skill-filesystem parseSkillFile）
 *
 * 用法（在仓库根执行，脚本假定自己在 <repo>/tools/）：node tools/validate-package.ts
 */
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const SKILLS = join(HERE, "..", "integrations", "deepseek-harness", "skills");
const EXPECTED = 92;

const ALLOWED = new Set(["name", "description", "whenToUse", "metadata", "disable-model-invocation", "user-invocable"]);
const LEGACY = new Set(["disableModelInvocation", "modelInvocable", "userInvocable"]);

/** CONTEXT D8：本包的 8 个用户调用型技能（上游 mattpocock/skills 成文策略）。 */
const USER_INVOKED = ["grill-me", "grill-with-docs", "handoff", "improve-codebase-architecture", "retro", "triage", "to-spec", "to-tickets"];

/** 8 个包内自有技能：无上游来源，metadata 允许只有 origin: dsh-kit。 */
const NATIVE = ["chrome-devtools-wsl", "diagnose", "dsh-kit", "github-repo", "grow-dream", "karpathy-guidelines", "write-a-skill", "wsl-network"];

/** 上游 metadata 三元组，与 references/upstream-sources.md 的引用总表一一对应。 */
const ORIGINS = new Map<string, [upstream: string, snapshot: string]>([
  ["ecc", ["affaan-m/ECC", "ef648e01899b"]],
  ["mp-skills", ["mattpocock/skills", "24fe0ef7737e"]],
  ["claude-mem", ["thedotmack/claude-mem", "3b3baaa55ebb"]],
]);

/** 唯一允许的嵌套 SKILL.md：grow-dream 的技能载荷模板，DSH 不会发现它。 */
const EXPECTED_PAYLOAD = ["grow-dream/templates/w-ocean/skills/w-ocean-agent/SKILL.md"];

const CJK = /[\u4e00-\u9fff]/;

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

/** 去围栏代码块：示例代码里的相对路径不是链接。 */
function stripFences(raw: string): string {
  const out: string[] = [];
  let fenced = false;
  for (const line of raw.split(/\r?\n/)) {
    if (/^\s*```/.test(line)) {
      fenced = !fenced;
      continue;
    }
    if (!fenced) out.push(line);
  }
  return out.join("\n");
}

/** 收集正文里指向包内相对路径的目标：markdown 链接目标 + 反引号中含 ../ 的路径。 */
function relativeTargets(prose: string): string[] {
  const targets: string[] = [];
  for (const m of prose.matchAll(/\]\(([^)\s]+)\)/g)) targets.push(m[1]);
  for (const m of prose.matchAll(/`([^`\n]+)`/g)) {
    if (m[1].includes("../")) targets.push(m[1]);
  }
  return targets;
}

const dirs = readdirSync(SKILLS).filter((n) => statSync(join(SKILLS, n)).isDirectory());
const allSkillMds = walk(SKILLS);
const discoverable = allSkillMds.filter((p) => p.slice(SKILLS.length + 1).split(/[\\/]/).length === 2);
const payload = allSkillMds.filter((p) => !discoverable.includes(p));

const problems: string[] = [];
const unknown: string[] = [];
const withDisableKey = new Set<string>();
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
  if (keys.includes("disable-model-invocation")) withDisableKey.add(d);
  const nameLine = /^name:\s*(.+)$/m.exec(fm);
  if (nameLine && nameLine[1].trim() !== d) problems.push(`name 与目录不一致: ${d} vs ${nameLine[1].trim()}`);

  const desc = /^description:\s*(.*)$/m.exec(fm)?.[1] ?? "";
  if (!CJK.test(desc)) problems.push(`description 无中文: ${d}`);

  const origin = /^\s+origin:\s*(\S+)\s*$/m.exec(fm)?.[1];
  const upstream = /^\s+upstream:\s*(\S+)\s*$/m.exec(fm)?.[1];
  const snapshot = /^\s+snapshot:\s*(\S+)\s*$/m.exec(fm)?.[1];
  if (NATIVE.includes(d)) {
    if (origin !== undefined && origin !== "dsh-kit") problems.push(`自有技能 metadata.origin 应为 dsh-kit: ${d} -> ${origin}`);
  } else {
    const expected = origin === undefined ? undefined : ORIGINS.get(origin);
    if (expected === undefined) {
      problems.push(`metadata.origin 缺失或不合法: ${d} -> ${origin ?? "(无)"}`);
    } else {
      if (upstream !== expected[0]) problems.push(`metadata.upstream 与引用总表不符: ${d} -> ${upstream ?? "(无)"}`);
      if (snapshot !== expected[1]) problems.push(`metadata.snapshot 与引用总表不符: ${d} -> ${snapshot ?? "(无)"}`);
    }
  }

  const seen = new Set<string>();
  for (const target of relativeTargets(stripFences(raw))) {
    if (!target.startsWith("./") && !target.startsWith("../")) continue;
    if (/[<*|]/.test(target)) continue;
    const path = target.split("#")[0].split("?")[0];
    if (path.length === 0 || seen.has(path)) continue;
    seen.add(path);
    if (!existsSync(resolve(join(SKILLS, d), path))) problems.push(`正文相对路径不存在: ${d} -> ${path}`);
  }
}

const missingD8 = USER_INVOKED.filter((n) => !withDisableKey.has(n));
const extraD8 = [...withDisableKey].filter((n) => !USER_INVOKED.includes(n)).sort();
if (missingD8.length) problems.push(`D8 名单缺 disable-model-invocation: ${missingD8.join(",")}`);
if (extraD8.length) problems.push(`D8 名单外多出 disable-model-invocation: ${extraD8.join(",")}`);

const payloadRel = payload.map((p) => p.slice(SKILLS.length + 1).split(/[\\/]/).join("/"));
const payloadOk = payloadRel.length === EXPECTED_PAYLOAD.length && payloadRel.every((p) => EXPECTED_PAYLOAD.includes(p));
if (!payloadOk) {
  problems.push(`载荷型嵌套 SKILL.md 与预期不符: ${payloadRel.join(", ") || "(无)"}（期望 ${EXPECTED_PAYLOAD.join(", ")}）`);
}

console.log(`技能目录数 = ${dirs.length}（期望 ${EXPECTED}）${dirs.length === EXPECTED ? " ✅" : " ❌"}`);
console.log(`可发现的 SKILL.md = ${discoverable.length}`);
console.log(`载荷型嵌套 SKILL.md = ${payload.length}${payloadOk ? " ✅" : " ❌"}`);
for (const p of payloadRel) console.log("   · " + p);
console.log(`用户调用型（disable-model-invocation）= ${withDisableKey.size}（期望 ${USER_INVOKED.length}）${withDisableKey.size === USER_INVOKED.length ? " ✅" : " ❌"}`);
console.log(`致命 frontmatter / 元数据 / 死链问题 = ${problems.length}${problems.length === 0 ? " ✅" : " ❌"}`);
for (const p of problems) console.log("  ❌ " + p);
console.log(`非致命：含未认可键的技能 = ${unknown.length}`);
for (const u of unknown) console.log("   · " + u);
console.log(`SKILL.md 正文总体量 = ${(bytes / 1024 / 1024).toFixed(2)} MB`);

process.exitCode = problems.length === 0 && dirs.length === EXPECTED ? 0 : 1;
