/**
 * dsh-kit 包内技能面自查（不需要 DSH 运行）。
 *
 * 语言政策（v6.0.6 起；判据见 CONTEXT「正文语言 / 最小适配」）：
 *   **正文英文**（上游逐字，仅叠加必需适配；CC 语境横幅也是英文）、**`description` 英中双语**。
 *   本轮之前是"正文保留上游原文、中文只出现在元数据层"⇒ ⑤ 曾经反向要求 description **含中文**，
 *   现按新政策收口；⑥ 是本轮**新增**的正文语言门。
 *
 * 校验项（除 ⑩ 外全部计入退出码）：
 *  1) 技能数 = 92，每个技能目录都有 SKILL.md
 *  2) 只有 skills/<name>/SKILL.md 一层会被 DSH 发现；嵌套 SKILL.md 只允许 grow-dream 的模板载荷，数量与路径必须与预期一致
 *  3) frontmatter 无致命 legacy 键（disableModelInvocation / modelInvocable / userInvocable）
 *  4) name/description 必填，且 name 与目录名一致
 *  5) description 必须**英中双语**：同时含拉丁字母与 CJK 表意字。缺任一侧即失败
 *     ⚠ 这是"必要条件"不是"充分条件"：它答不了"有没有一句英文"（见 LATIN 的注释与 README「不覆盖」）
 *  6) SKILL.md **正文（frontmatter 之外）不得出现 CJK**。豁免只有 LANGUAGE_ALLOWED 里**带理由**的那些，
 *     且逐条打印（含"白名单已腐化"的提示：文件不再含 CJK 时该条应撤）
 *  7) 8 个用户调用型技能的名单必须与 CONTEXT D8 完全一致（disable-model-invocation 在位、无第 9 个）
 *  8) 84 个上游技能的 metadata 必须带 origin/upstream/snapshot，且与 references/upstream-sources.md 的引用总表一致
 *  9) 正文内指向包内相对路径的 markdown 链接与反引号路径必须存在（防死链）
 * 10) 未认可键只报告不报错（DSH 解析器忽略未知键，见 skill-filesystem parseSkillFile）
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

/** CJK 表意字（含扩展 A 与兼容区）。description 要**有**它；正文**不得有**它。 */
const CJK = /[\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff]/;

/**
 * 拉丁字母 —— description 要**有**它。
 *
 * ⚠ **能力边界（诚实标注，别据它宣称"描述已是英文"）**：这条判据只证明"出现了拉丁字母"，
 * 证明不了"有一句英文"。中文描述里只要提到一个拉丁术语（如 `TDD`）就会通过。
 * 收紧判据试过两条、都被实测否决：
 *   · `[A-Za-z]{3,}`（要求 ≥3 字母的拉丁词）—— 它**既没用又误报**：`TDD` 本身就匹配，
 *     而真正合法的英文短语 `go/no-go`（`council` 的 description）**反而被判失败**；
 *   · 要求小写拉丁串 —— 会把 `(RAG)` 这类全大写术语的合法描述误伤。
 * ⇒ 保留最弱但**零误报**的这一条；"描述写得够不够英文"仍需人读（README「验收」节已列入不覆盖项）。
 */
const LATIN = /[A-Za-z]/;

/**
 * **正文含 CJK 的显式豁免**（唯一出口；键 = 技能目录名，值 = 理由）。
 *
 * 纪律（v6.0.6 立）：**不许为了让门变绿而删/改上游正文** —— 确属上游自带的中文内容时，
 * 在这里登记一条**带理由**的豁免，门会逐条打印它（含"文件已无 CJK ⇒ 该撤"的腐化提示）。
 * 空表 = 正文全英文，是本包的默认目标形态。
 */
const LANGUAGE_ALLOWED = new Map<string, string>([
  [
    "prompt-optimizer",
    "上游正文自带中文，且中文是该技能的**职能数据**：① 触发词/意图表的中文列（`优化prompt`、创建、实现、添加 等——识别中文意图正是它的职责）；② :260-303 是一份「中文 prompt → 优化后中文 prompt」的完整实例。删掉即破坏该技能",
  ],
]);

function topKeys(fm: string): string[] {
  const keys: string[] = [];
  for (const line of fm.split(/\r?\n/)) {
    const m = /^([A-Za-z][A-Za-z0-9_-]*)\s*:/.exec(line);
    if (m) keys.push(m[1]);
  }
  return keys;
}

/**
 * 切出 frontmatter 与正文。正文 = 闭合 `---` 行**之后**的全部内容（含 CC 语境横幅）。
 * `bodyLine` = 正文第一行的 1-based 行号（供报"首次出现于 :N"）。
 * 返回 undefined = 无 frontmatter（`---` 不在首行 / 没有闭合行）。
 * 一次扫描同时给两样东西：⑤ 只看 fm、⑥ 只看 body，判据同源，不会各自解析一遍。
 */
function splitFrontmatter(raw: string): { fm: string; body: string; bodyLine: number } | undefined {
  const nl = raw.indexOf("\n");
  if (nl < 0 || raw.slice(0, nl).replace(/\r$/, "") !== "---") return undefined;
  let lineStart = nl + 1;
  let line = 2;
  for (;;) {
    const next = raw.indexOf("\n", lineStart);
    const lineEnd = next < 0 ? raw.length : next;
    if (raw.slice(lineStart, lineEnd).replace(/\r$/, "") === "---") {
      return { fm: raw.slice(nl + 1, lineStart), body: raw.slice(lineEnd + 1), bodyLine: line + 1 };
    }
    if (next < 0) return undefined;
    lineStart = next + 1;
    line += 1;
  }
}

/** 正文里**首次**出现 CJK 的行号（1-based，绝对行号）；没有则 0。 */
function firstCjkLine(body: string, bodyLine: number): number {
  const lines = body.split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) if (CJK.test(lines[i])) return bodyLine + i;
  return 0;
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
/** 语言面的读数（⑤ / ⑥）与白名单命中情况。`bodyOk` 把**白名单命中**也算合规。 */
let descOk = 0;
let bodyOk = 0;
const allowedHit: string[] = [];
const staleAllowed: string[] = [];
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
  const split = splitFrontmatter(raw);
  if (split === undefined) {
    problems.push(`无 frontmatter: ${d}`);
    continue;
  }
  const { fm, body, bodyLine } = split;
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

  // ⑤ description 必须**英中双语**（缺任一侧即失败）。判据见文件头。
  const desc = /^description:\s*(.*)$/m.exec(fm)?.[1] ?? "";
  const descLatin = LATIN.test(desc);
  const descCjk = CJK.test(desc);
  if (descLatin && descCjk) descOk += 1;
  else {
    const lack = [!descLatin ? "缺拉丁字母" : "", !descCjk ? "缺中文" : ""].filter(Boolean).join(" / ");
    problems.push(`description 非英中双语（${lack}）: ${d}`);
  }

  // ⑥ 正文（frontmatter 之外）不得出现 CJK；豁免只有 LANGUAGE_ALLOWED 里带理由的那些。
  // ⚠ 「白名单命中」**算合规**（同一个检查里 ❌ 与「问题 = 0 ✅」不能并存 —— 那会让人以为门自相矛盾）。
  if (CJK.test(body)) {
    if (LANGUAGE_ALLOWED.has(d)) {
      allowedHit.push(d);
      bodyOk += 1;
    } else {
      problems.push(`正文含 CJK（正文须全英文）: ${d} 首次出现于 :${firstCjkLine(body, bodyLine)}`);
    }
  } else {
    bodyOk += 1;
    if (LANGUAGE_ALLOWED.has(d)) staleAllowed.push(d);
  }

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
console.log(`⑤ description 英中双语 = ${descOk} / ${dirs.length}${descOk === dirs.length ? " ✅" : " ❌"}`);
console.log(`⑥ 正文全英文 = ${bodyOk} / ${dirs.length}${bodyOk === dirs.length ? " ✅" : " ❌"}（白名单命中计入合规）`);
console.log(`   正文 CJK 显式豁免 = ${LANGUAGE_ALLOWED.size} 条（本次命中 ${allowedHit.length} 条）${staleAllowed.length ? " ⚠" : ""}`);
for (const [name, why] of LANGUAGE_ALLOWED) {
  const hit = allowedHit.includes(name);
  console.log(`   · ${name}${hit ? "" : "（⚠ **该文件已无 CJK ⇒ 豁免已腐化，请撤销这条**）"} —— ${why}`);
}
if (staleAllowed.length === 0 && LANGUAGE_ALLOWED.size === 0) console.log("   · （空表：正文全英文是目标形态）");
console.log(`致命 frontmatter / 元数据 / 死链 / 语言问题 = ${problems.length}${problems.length === 0 ? " ✅" : " ❌"}`);
for (const p of problems) console.log("  ❌ " + p);
console.log(`非致命：含未认可键的技能 = ${unknown.length}`);
for (const u of unknown) console.log("   · " + u);
console.log(`SKILL.md 正文总体量 = ${(bytes / 1024 / 1024).toFixed(2)} MB`);

process.exitCode = problems.length === 0 && dirs.length === EXPECTED ? 0 : 1;
