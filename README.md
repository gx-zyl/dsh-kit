# dsh-kit（DeepSeek Harness 版）

DeepSeek Harness **bundle 形式**的技能包：**16 个 DSH 原生技能**，包内隔离加载（provider `dsh-kit`，`includeDefaultRoots: false`），不写入 `~/.agents/skills` 等 canonical 技能目录。

- 包位置：`integrations/deepseek-harness/`（包名 **`dsh-kit`**）
- 技能：**16 个** = 15 个能力技能 + 1 个元技能 `dsh-kit`
- 随包参考文件：`rules/`（WSL CLI 工具链、代理管理）、`references/`（grow-dream 类型定义）
- 来源：本包为 DSH 原生（不再包含第三方技能集）

## 技能清单

| 类别 | 技能 |
|------|------|
| 调试 | `diagnose`、`grill-with-docs` |
| 架构 | `improve-codebase-architecture`、`architecture-decision-records` |
| 设计 | `api-design`、`grill-me`、`prototype` |
| 数据 | `docker-patterns` |
| 沉淀 | `grow-dream`、`handoff`、`write-a-skill` |
| WSL | `chrome-devtools-wsl`、`wsl-network` |
| 规范 | `karpathy-guidelines` |
| 工具 | `github-repo` |
| 元技能 | `dsh-kit`（包自述与技能导航） |

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

`dsh plugin add` 会写入 `"dsh-kit": "link:<本地路径>/integrations/deepseek-harness"`，并把 `dsh-kit` 追加到该 profile 的 `dsh.profile.bundles`；包清单变化会触发 DSH 重载，无需手工改 patch。

## 卸载

```powershell
dsh plugin --profile <profile> remove dsh-kit
```

## 结构

```
dsh-kit/
├── README.md
└── integrations/deepseek-harness/
    ├── package.json          # dsh-kit
    ├── cordis.patch.yml      # 注册 dsh-kit-skill-filesystem（技能从包内 skills/ 提供）
    ├── lib/index.js          # skill-only bundle，无运行期服务
    ├── skills/               # 16 个技能，每个含 SKILL.md
    ├── rules/                # wsl-cli-tools.md、proxy-management.md
    └── references/           # grow-dream-types.md
```

## 许可

MIT。
