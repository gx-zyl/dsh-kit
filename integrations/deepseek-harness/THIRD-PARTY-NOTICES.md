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

本包对上游内容只做 CONTEXT.md「最小适配」约定的四件事，外加两类**有据可查**的补丁：

1. **目录拍平**：`skills/<name>/SKILL.md` 一层（DSH 只发现这一层；上游 `mattpocock/skills` 为 `skills/<cat>/<name>/` 两层）。
2. **frontmatter 收敛**：只保留 DSH 认可键 `name` / `description`（+ 可选 `metadata`、`disable-model-invocation`、`user-invocable`）；上游的 `license` / `tools` / `allowed-tools` / `argument-hint` 等杂键被删除。**注意**：被删的杂键原始值不随包保留，需要时应回上游快照取。
3. **`description` 中文化**：改写为中文触发语（供召回）；**正文保持上游原文**。
4. **正文内 Claude Code 语境路径**：有 DSH 等价物时改写（如 `~/.claude/skills` → `~/.agents/skills`），无等价物时加**横幅标注**说明「勿直接套用」。
5. **同源同名技能取上游为准**（CONTEXT「融合」）：例如 `api-design`、`architecture-decision-records`、`docker-patterns` 的包内旧版被上游版覆盖。
6. **改名**：`claude-mem` 源的 `handoff` 与本包 `mattpocock/skills` 源的 `handoff` 同名不同物，前者改名为 `session-handoff`。

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

带横幅的文件共 **11** 个：`council`、`design-is`、`docker-patterns`、`eval-harness`、`safety-guard`、`search-first`、`skill-scout`、`standup`、`strategic-compact`、`verification-loop` 的 `SKILL.md`，以及 `agent-self-evaluation/references/hook-integration.md`。属 Apache-2.0（`claude-mem`）源的是 `standup` 与 `design-is` 两个 `SKILL.md`——对它们而言，横幅同时充当 §4(b) 要求的「被修改」显著标注。

**已知残留**：`claude-mem` 源另有 4 个技能（`session-handoff`、`what-the`、`learn-codebase`、`babysit`）在**入库时**即被改了 frontmatter（`description` 中文化、杂键删除），文件内没有逐文件标注，其改动只登记在本文件的表中。若需严格按 §4(b) 做到「每个被修改文件自身带标注」，需对这 4 个文件补行——**待裁决**，未擅自改动上游正文。
