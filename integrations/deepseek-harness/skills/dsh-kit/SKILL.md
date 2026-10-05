---
name: dsh-kit
description: dsh-kit 技能包元技能。说明本包 92 个技能的能力边界与来源（8 个包内自有 + 84 个上游合并：ECC 59 / mattpocock 19 / claude-mem 6），并指引 rules/ 与 references/。用户问"dsh-kit 有什么""插件能力""包里有哪些技能"时触发。
---

# dsh-kit 技能包

dsh-kit 是一个 **DeepSeek Harness bundle 形式**的技能包，提供 **92 个技能**。技能随包隔离加载（provider `dsh-kit`，`includeDefaultRoots: false`），不写入 `~/.agents/skills` 等 canonical 技能目录。

## 技能来源

| 来源 | 数量 | 许可 | 说明 |
|------|------|------|------|
| 包内自有 | **8** | MIT | `chrome-devtools-wsl`、`diagnose`、`dsh-kit`、`github-repo`、`grow-dream`、`karpathy-guidelines`、`write-a-skill`、`wsl-network` |
| `affaan-m/ECC` | **59** | MIT | 通用工程流程 + 语言生态（Python/Go/Rust/Java/Kotlin/JS/Django/Laravel/Rails）+ agent 元技能 |
| `mattpocock/skills` | **19** | MIT | 评审、规格、拆票、分诊、TDD、拷问式设计 |
| `thedotmack/claude-mem` | **6** | Apache-2.0 | 交接文档、站会、PR 盯守、代码库认知、设计审计 |
| `alibaba/open-code-review` | **0** | Apache-2.0 | 其 2 个技能是 `ocr` CLI 的调用封装，按"工具本体不进技能面"仅登记为参考资料 |

逐条清单、快照 SHA 与取用范围见 `../../references/upstream-sources.md` 与四份分册。

## 按用途找技能（节选）

| 用途 | 技能 |
|------|------|
| 验证与评审 | `code-review`、`verification-loop`、`santa-method`、`production-audit`、`security-review` |
| 设计与架构 | `codebase-design`、`architecture-decision-records`、`hexagonal-architecture`、`contract-first`、`api-design`、`domain-modeling` |
| 需求与分诊 | `to-spec`、`to-tickets`、`triage`、`intent-driven-development`、`grill-with-docs`、`grilling` |
| 实现与测试 | `tdd`、`e2e-testing`，以及 `python-testing`、`golang-testing`、`rust-testing`、`kotlin-testing`、`django-tdd`、`react-testing` |
| 上下文与 agent | `strategic-compact`、`context-budget`、`eval-harness`、`prompt-optimizer`、`skill-scout`、`rules-distill` |
| 交付与仓库 | `git-workflow`、`pr`、`deployment-patterns`、`database-migrations`、`setup-pre-commit` |
| 环境与工具 | `chrome-devtools-wsl`、`wsl-network`、`docker-patterns`、`mcp-server-patterns`、`kubernetes-patterns` |

完整 92 个以包内 `skills/` 目录为准；调用时以每个技能的 `description` 触发。

## 全局规则

- 项目使用 PowerShell（`pwsh`），非 bash
- 技能描述（`description`）决定 DSH 何时加载该技能；正文多为上游原文
- 84 个上游技能的正文保持上游原样，可能残留 **Claude Code 语境的路径或机制说明**（如 `~/.claude/...`、hooks 配置、`allowed-tools`）；本包只改写了指向技能目录的死链，其余以 `../../references/upstream-*.md` 的处置说明为准
- `grill-with-docs` 是 8 行委托式技能，会串联 `grilling` 与 `domain-modeling`
- `disable-model-invocation: true` 的 8 个技能只能由用户显式调用，不进入模型可见目录

## 参考文档

随包分发的规则/参考文件，位于包根目录 `rules/` 与 `references/`：

| 路径 | 文件 | 用途 |
|------|------|------|
| `../../rules/` | `wsl-cli-tools.md` | WSL 现代 CLI 工具链映射表 |
| `../../rules/` | `proxy-management.md` | 代理管理与 DSH 插件包操作指南 |
| `../../references/` | `grow-dream-types.md` | grow-dream 候选类型定义 |
| `../../references/` | `upstream-sources.md` | 上游来源登记索引（引用键/快照/许可/取用范围） |
| `../../references/` | `upstream-ecc.md` | ECC 来源分册（59 个技能） |
| `../../references/` | `upstream-mp-skills.md` | mattpocock/skills 来源分册（19 个技能） |
| `../../references/` | `upstream-claude-mem.md` | claude-mem 来源分册（6 个技能） |
| `../../references/` | `upstream-ocr.md` | open-code-review 分册（0 技能，说明为何只登记参考资料） |
