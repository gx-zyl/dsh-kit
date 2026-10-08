# 第三方声明（THIRD-PARTY-NOTICES）

`dsh-kit` 自有部分为 **MIT**（见同目录 `LICENSE`）。`skills/` 下的 **84** 个技能正文、参考文件与脚本来自下列四个上游仓库，本文件按各自许可的要求随包登记**许可正文、版权行、快照与变更声明**。

| 引用键 | 上游 | 快照 | 许可 | 取用技能数 | 许可正文 |
|---|---|---|---|---|---|
| `ecc-ef648e0` | `affaan-m/ECC` | `ef648e01899b` | MIT | 59 | [`LICENSES/MIT-ECC.txt`](LICENSES/MIT-ECC.txt) |
| `mp-24fe0ef` | `mattpocock/skills` | `24fe0ef7737e` | MIT | 19 | [`LICENSES/MIT-mattpocock-skills.txt`](LICENSES/MIT-mattpocock-skills.txt) |
| `cmem-3b3baaa` | `thedotmack/claude-mem` | `3b3baaa55ebb` | Apache-2.0 | 6 | [`LICENSES/Apache-2.0.txt`](LICENSES/Apache-2.0.txt) + [`LICENSES/NOTICE-claude-mem.txt`](LICENSES/NOTICE-claude-mem.txt) |
| `ocr-182898c` | `alibaba/open-code-review` | `182898cf522d` | Apache-2.0 | 0 | 未分发任何内容，故不单列；文本同上 `LICENSES/Apache-2.0.txt` |

- 许可正文取自各上游在**上表快照 commit** 处的 `LICENSE` 文件（经代理 `http://127.0.0.1:9910` 从 `raw.githubusercontent.com` 取回，逐字节转存）。
- `claude-mem` 的 `NOTICE` 文件（`LICENSES/NOTICE-claude-mem.txt`）按 Apache-2.0 §4(d) 一并随包分发。
- `affaan-m/ECC` 与 `mattpocock/skills` 经核对**无 `NOTICE` 文件**（HTTP 404），故无 §4(d) 义务。
- `alibaba/open-code-review` 的 2 个技能均为 `ocr` CLI 调用封装，按「工具本体不进技能面」未取用，本包**未分发该上游任何字节**；登记仅用于说明取舍（见 `references/upstream-ocr.md`）。

## 变更声明

本包对上游内容只做 CONTEXT.md「最小适配（A）」约定的 **7 条**（该词条是判据的唯一出处；本节只回答「改了什么」，不复制它的判据）：

1. **目录拍平**：`skills/<name>/SKILL.md` 一层（DSH 只发现这一层；上游 `mattpocock/skills` 为 `skills/<cat>/<name>/` 两层）。
2. **frontmatter 收敛**：只保留 DSH 认可键 `name` / `description`（+ 可选 `metadata`、`disable-model-invocation`、`user-invocable`）；上游的 `license` / `tools` / `allowed-tools` / `argument-hint` 等杂键被删除。**注意**：被删的杂键原始值不随包保留，需要时应回上游快照取。
3. **语言处置**：`description` 改写为**英中双语**（英文侧 = 上游 description 折叠成一行 + 中文触发语，供召回）；**正文英文** —— 以上游为底逐字保留，仅叠加本节其余各项。上游正文**自带 CJK 区字符**时**保留并在 `tools/validate-package.ts` 的 `LANGUAGE_ALLOWED` 里带理由登记**（可登记的理由只有两类：① 中文是职能数据；② 上游英文正文自带的 CJK 排版字符）。**以该表为唯一权威**（本节不抄名单或计数；门逐条打印，命中与腐化都可见，**腐化计入失败**）。
4. **正文内 Claude Code 专有路径 / 文件名 / 工具名 → DSH 等价物**：有等价物时改写（如 `~/.claude/skills` → `~/.agents/skills`、`Skill tool` → `skill tool`）。**例外（本轮立，逐处可核；此处只引原句、不写行号 —— 行号会腐烂）**：当句子的**主语就是 Claude Code 本身**、或该句是**跨 harness 的并列清单**时，`CLAUDE.md` 是**被谈论的对象**、不是本机路径 ⇒ **保留原名**。正文 4 处：`living-docs-governance` 的 “harness instructions such as `AGENTS.md`, `CLAUDE.md`, `.cursor/rules`…” 与 “Claude Code projects commonly use `CLAUDE.md`.”、`retro` 的 “`AGENTS.md`/`CLAUDE.md` (the Claude Code form)”、`writing-for-agents` 的 “a skill, an `AGENTS.md` / `CLAUDE.md`”；`description` 2 处：`codebase-onboarding` 的 “a starter CLAUDE.md”、`writing-for-agents` 的 “modifying AGENTS.md or CLAUDE.md”。**不要写成「全量映射 X→0」**，那会把合法保留说成遗漏。
5. **包内相对死链中性化**：指向**包内不存在**的相对链接（**含不带 `./` / `../` 的裸相对目标**）改为**纯文本**并注明「上游参考，未随包分发」（逐文件见下方「修复轮补充改写」表）。
6. **CC 语境横幅**：无 DSH 等价物的 Claude Code / 其他 runner 机制，加**英文**横幅说明「勿直接套用」（清单见末节「正文内的行内标注」）。
7. **Apache-2.0 §4(b) 变更标注**（**仅** `claude-mem` 源、本轮被改的 4 个文件）：`babysit` / `learn-codebase` / `session-handoff` / `what-the` 的 `SKILL.md` 各插入**一个英文引用块**（正文开头、frontmatter 之后），逐字文本见下方「Apache-2.0 §4(b) 逐文件变更标注」节。§4(b) 要求**每个被修改的文件自身**携带「你改过它」的显著标注 ⇒ 这 4 行是**许可履行**，不是内容改写（不碰技能语义）。

下列两类补丁**不属于**「最小适配」，单列以便复核：

8. **同源同名技能取上游为准**（CONTEXT「融合」）：例如 `api-design`、`architecture-decision-records`、`docker-patterns` 的包内旧版被上游版覆盖。
9. **改名**：`claude-mem` 源的 `handoff` 与本包 `mattpocock/skills` 源的 `handoff` 同名不同物，前者改名为 `session-handoff`。

### 被改写过正文或元数据的技能（git 历史可复现）

对每个 `skills/<name>/` 取其新增提交，再看其后是否仍有提交；命中 **30** 个（含 8 个包内自有，非上游）：

| 上游 | 被再次改动过正文/元数据的技能 |
|---|---|
| `affaan-m/ECC`（12） | `agent-self-evaluation`、`api-design`、`architecture-decision-records`、`council`、`docker-patterns`、`eval-harness`、`rules-distill`、`safety-guard`、`search-first`、`skill-scout`、`strategic-compact`、`verification-loop` |
| `mattpocock/skills`（9） | `grill-me`、`grill-with-docs`、`handoff`、`improve-codebase-architecture`、`prototype`、`retro`、`to-spec`、`to-tickets`、`triage` |
| `thedotmack/claude-mem`（1） | `standup`（`standup.mjs` → `standup.ts`、7 处脚本调用行改写、机制残留横幅） |
| 包内自有（8，非上游） | `chrome-devtools-wsl`、`diagnose`、`dsh-kit`、`github-repo`、`grow-dream`、`karpathy-guidelines`、`write-a-skill`、`wsl-network` |

复现命令：

```bash
# 对每个技能目录：新增提交之后是否还有提交
for d in integrations/deepseek-harness/skills/*/; do
  add=$(git log --diff-filter=A --format=%h -- "$d" | tail -1)
  n=$(git log --oneline "$add..HEAD" -- "$d" | wc -l)
  [ "$n" -gt 0 ] && echo "$(basename "$d") $n"
done
```

### 修复轮补充改写（2026-10-07）

本文件随附的修复轮又改写了下列文件（均为上游正文，逐条可 `git show` 复核）：

| 上游 | 技能/文件 | 改了什么 |
|---|---|---|
| `affaan-m/ECC` | `react-patterns`、`react-testing`、`mcp-server-patterns` 的 `SKILL.md` | 指向包外的死链（`../../rules/react/*`、`../<上游技能>/SKILL.md`、`../../docs/capability-surface-selection.md`）改为**纯文本**并注明「上游参考，未随包分发」；存活链接保留 |
| `affaan-m/ECC` | `council`、`eval-harness`、`safety-guard`、`search-first`、`skill-scout`、`strategic-compact`、`verification-loop` 的 `SKILL.md` 与 `agent-self-evaluation/references/hook-integration.md` | 已有横幅里的上游归属写错（写成 `mattpocock/skills`），改为 `affaan-m/ECC` |
| `affaan-m/ECC` | `docker-patterns/SKILL.md` | 补 Claude Code 语境横幅（`/workspace/project/.claude`） |
| `thedotmack/claude-mem` | `standup/SKILL.md` | 补机制名横幅（`${CLAUDE_SKILL_DIR}` / `AskUserQuestion` / `Task` / `/do` 的 DSH 替代）；删掉正文里 DSH 不存在的 `${CLAUDE_SKILL_DIR}` 环境变量名 |
| `thedotmack/claude-mem` | `design-is/SKILL.md` | 补横幅：Phase 4 交付物指向的上游 slash command `/make-plan` 在本包与 DSH 都不存在 |
| `thedotmack/claude-mem` | `standup/standup.ts` | 头部注释的 Node 版本要求改为 ≥22.18（`.ts` 入口需要原生 type-stripping） |

### 正文内的行内标注

带横幅的文件（v6.0.6 修复轮读数；**以清单为准**，不写死个数 —— 横幅会随上游适配增删。复现：`Select-String -Path integrations/deepseek-harness/skills/*/SKILL.md,integrations/deepseek-harness/skills/*/references/*.md -Pattern '\[!NOTE\]'`）：`council`、`design-is`、`docker-patterns`、`eval-harness`、`intent-driven-development`、`safety-guard`、`search-first`、`skill-scout`、`standup`、`strategic-compact`、`verification-loop` 的 `SKILL.md`，`babysit` / `learn-codebase` / `session-handoff` / `what-the` 的 `SKILL.md`（**新增：§4(b) 变更标注**，见下节），以及 `agent-self-evaluation/references/hook-integration.md`。⚠ 修复轮修正：旧版写「当时 11 个」并漏列 `intent-driven-development`（其横幅正是本版新增）——**这个数已改为不带门**。属 Apache-2.0（`claude-mem`）源的 **6 个 `SKILL.md` 现在全部带 banner**：`standup` / `design-is` 的机制横幅，与 `babysit` / `learn-codebase` / `session-handoff` / `what-the` 的 §4(b) 标注。

### Apache-2.0 §4(b) 逐文件变更标注（`claude-mem` 源，6 个技能）

§4(b) 要求**每个被修改的文件自身**携带显著变更标注。本包对 `claude-mem` 全部 6 个技能的处置如下（三栏分开写清：**改了什么** / **文件内标注** / **插入位置**）：

| 技能（`thedotmack/claude-mem`） | 改了什么 | 文件内 §4(b) 标注 | 位置 |
|---|---|---|---|
| `standup` | 机制名横幅（`${CLAUDE_SKILL_DIR}` / `AskUserQuestion` / `Task` / `/do` 的 DSH 替代）、删掉 DSH 不存在的环境变量名、`description` 英中双语、`standup.ts` 头注释 | **已履行**（英文机制横幅，兼作 §4(b) 标注） | 正文开头 |
| `design-is` | Phase 4 指向的上游 slash command `/make-plan` 在本包与 DSH 都不存在 ⇒ 补横幅；`description` 英中双语 | **已履行**（英文机制横幅，兼作 §4(b) 标注） | 正文开头 |
| `babysit` | `description` 改写为英中双语、上游杂键删除；正文按上游逐字（仅叠加最小适配） | **已履行**（下方逐字文本，已插入） | 正文开头（frontmatter 之后、H1 之前） |
| `learn-codebase` | 同上 | **已履行**（下方逐字文本，已插入） | 同上 |
| `session-handoff` | 同上（该技能系 `handoff` 改名而来，改名登记见上节第 9 条） | **已履行**（下方逐字文本，已插入） | 同上 |
| `what-the` | 同上 | **已履行**（下方逐字文本，已插入） | 同上（该文件无 H1，正文首行即原第一句） |

**插入的逐字文本**（`babysit` / `learn-codebase` / `session-handoff` / `what-the` 四份 `SKILL.md` 一字不差，均为 5 行英文引用块；复现：`Select-String -Path integrations/deepseek-harness/skills/*/SKILL.md -Pattern 'Modified for DSH \(dsh-kit\)'`）：

```
> [!NOTE]
> **Modified for DSH (dsh-kit)** — this file was changed from upstream `thedotmack/claude-mem@3b3baaa55ebb`: the
> `description` was rewritten to bilingual (English + Chinese trigger) and upstream-only frontmatter keys were
> removed; the body is upstream text verbatim plus the minimal adaptations listed in
> `../../THIRD-PARTY-NOTICES.md`. Copyright remains with the upstream authors (Apache-2.0).
```

**状态**：`claude-mem` 6 个技能的 §4(b) 逐文件标注**已全部履行**（登记面：上表；文件内：机制横幅 ×2 + 变更标注 ×4）。
插入方式与可复核性：4 份文件的 diff 均为 **+6 行 / −0 行**（5 行引用块 + 1 行分隔空行）⇒ 上游正文**逐字未动**；`git diff` 可逐文件核。
⚠ 该标注**不改技能语义**，只是许可声明；它属 CONTEXT「最小适配（A）」的**第 ⑦ 条**。
