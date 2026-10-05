# dsh-kit（DeepSeek Harness 版）

DeepSeek Harness **bundle 形式**的技能包：**92 个技能**（8 个 DSH 原生 + 84 个上游合并），包内隔离加载（provider `dsh-kit`，`includeDefaultRoots: false`），不写入 `~/.agents/skills` 等 canonical 技能目录。

| 项 | 值 |
|---|---|
| 包位置 | `integrations/deepseek-harness/`（包名 **`dsh-kit`**） |
| 版本 | **6.0.2** |
| 技能 | **92** = 8 个包内自有 + 84 个上游合并（`affaan-m/ECC` 59 / `mattpocock/skills` 19 / `thedotmack/claude-mem` 6 / `alibaba/open-code-review` 0） |
| 随包参考 | `rules/`（WSL CLI 工具链、代理管理）、`references/`（grow-dream 类型定义 + 上游来源登记） |
| 上游来源登记 | `references/upstream-sources.md` 与四份分册（论文引用格式：作者/载体/快照 SHA/许可/URL/取用范围） |

## 安装（本地 link）

```powershell
# 1) 取到本仓库
git clone <本仓库地址> <本地路径>

# 2) 用官方 CLI 装进目标 profile
#    Desktop 端用安装包自带 CLI：<安装目录>\resources\runtime\cli\bin\dsh.cmd
dsh plugin --profile <profile> add "<本地路径>/integrations/deepseek-harness"

# 3) 验证
dsh plugin --profile <profile> list --depth 0
```

`dsh plugin add` 会写入 `"dsh-kit": "link:<本地路径>/integrations/deepseek-harness"`，并把 `dsh-kit` 追加到该 profile 的 `dsh.profile.bundles`；包清单变化会触发 DSH 重载。

## 卸载

```powershell
dsh plugin --profile <profile> remove dsh-kit
```

## 技能清单

完整逐条清单（含上游路径与处置）见 [`integrations/deepseek-harness/references/upstream-sources.md`](integrations/deepseek-harness/references/upstream-sources.md) 与四份分册。这里按来源分组列出全部 92 个：

### 包内自有（8）

|  |  |  |  |
|---|---|---|---|
| `chrome-devtools-wsl` | `dsh-kit` | `grow-dream` | `karpathy-guidelines` |
| `write-a-skill` | `wsl-network` | `github-repo` | `diagnose` |

### 上游合并 · `affaan-m/ECC`（59）

|  |  |  |  |
|---|---|---|---|
| `accessibility` | `agent-harness-construction` | `agent-introspection-debugging` | `agent-self-evaluation` |
| `agentic-engineering` | `api-design` | `architecture-decision-records` | `benchmark` |
| `codebase-onboarding` | `coding-standards` | `context-budget` | `contract-first` |
| `council` | `database-migrations` | `deployment-patterns` | `django-patterns` |
| `django-tdd` | `docker-patterns` | `dotnet-patterns` | `e2e-testing` |
| `error-handling` | `eval-harness` | `git-workflow` | `golang-patterns` |
| `golang-testing` | `hexagonal-architecture` | `intent-driven-development` | `iterative-retrieval` |
| `java-coding-standards` | `kotlin-patterns` | `kotlin-testing` | `kubernetes-patterns` |
| `laravel-patterns` | `living-docs-governance` | `loop-design-check` | `mcp-server-patterns` |
| `nextjs-turbopack` | `parallel-execution-optimizer` | `postgres-patterns` | `production-audit` |
| `prompt-optimizer` | `python-patterns` | `python-testing` | `rails-patterns` |
| `react-patterns` | `react-testing` | `rules-distill` | `rust-patterns` |
| `rust-testing` | `safety-guard` | `santa-method` | `search-first` |
| `security-review` | `skill-scout` | `springboot-patterns` | `strategic-compact` |
| `swiftui-patterns` | `verification-loop` | `vue-patterns` |  |

### 上游合并 · `mattpocock/skills`（19）

|  |  |  |  |
|---|---|---|---|
| `code-review` | `codebase-design` | `domain-modeling` | `grill-me` |
| `grill-with-docs` | `grilling` | `handoff` | `improve-codebase-architecture` |
| `pr` | `prototype` | `research` | `retro` |
| `setup-pre-commit` | `tdd` | `to-spec` | `to-tickets` |
| `triage` | `wizard` | `writing-for-agents` |  |

### 上游合并 · `thedotmack/claude-mem`（6）

|  |  |  |  |
|---|---|---|---|
| `babysit` | `design-is` | `learn-codebase` | `session-handoff` |
| `standup` | `what-the` |  |  |

### 上游合并 · `alibaba/open-code-review`（0）

该上游的 2 个技能均为 `ocr` CLI 调用封装，按「工具本体不进技能面」未纳入 `skills/`，仅登记于 [`references/upstream-ocr.md`](integrations/deepseek-harness/references/upstream-ocr.md)。

## 参考资料（上游来源登记）

| 引用键 | 上游 | 快照 | 许可 | 取用 |
|---|---|---|---|---|
| `ecc-ef648e0` | `affaan-m/ECC` | `ef648e01899b` | MIT | 59 / 上游规范目录 |
| `mp-24fe0ef` | `mattpocock/skills` | `24fe0ef7737e` | MIT | 19 / 上游规范目录 |
| `cmem-3b3baaa` | `thedotmack/claude-mem` | `3b3baaa55ebb` | Apache-2.0 | 6 / 上游规范目录 |
| `ocr-182898c` | `alibaba/open-code-review` | `182898cf522d` | Apache-2.0 | 0 / 上游规范目录 |

每个技能的 `metadata` 里带有 `origin` / `upstream` / `snapshot`，与上表一一对应。

## 结构与合并约定

```
dsh-kit/
├── CONTEXT.md                        # 术语表（只放规范词）
├── README.md
└── integrations/deepseek-harness/
    ├── package.json                  # dsh-kit
    ├── cordis.patch.yml              # 注册 dsh-kit-skill-filesystem（技能从包内 skills/ 提供）
    ├── lib/index.js                  # skill-only bundle，无运行期服务
    ├── skills/                       # 92 个技能，每个含 SKILL.md
    ├── rules/                        # wsl-cli-tools.md、proxy-management.md
    └── references/                   # grow-dream-types.md + upstream-*.md（上游来源登记）
```

| 约定 | 内容 |
|---|---|
| 目录 | 技能必须是 `skills/<name>/SKILL.md` **一层**（DSH 不发现嵌套的深层 `SKILL.md`） |
| frontmatter | 只用 DSH 认可键：`name`、`description`（必填）+ `metadata`、`disable-model-invocation`、`user-invocable` |
| 语言 | `description` 写中文触发语（召回用）；**正文保持上游原文** |
| 署名 | 上游正文/参考文件/脚本版权归上游作者，`metadata` 与 `references/upstream-*.md` 双重登记 |

## 许可

MIT（本仓库自有部分）。随包合并的上游技能各自沿用其许可：`affaan-m/ECC` MIT、`mattpocock/skills` MIT、`thedotmack/claude-mem` Apache-2.0、`alibaba/open-code-review` Apache-2.0。
