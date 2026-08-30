# 🧰 cc-kit — 精选 AI 技能合集

> **统一技能包 v4.0.0** | cc-kit 自研 16 + Anthropic 官方 19 | **Claude Code / Cursor / DSH 多端可用**

[![version](https://img.shields.io/badge/version-4.0.0-blue)](https://github.com/gx-zyl/cc-kit)
[![skills](https://img.shields.io/badge/skills-35-green)](#技能清单)
[![dsh-plugin](https://img.shields.io/badge/DSH%20plugin-cc--kit--dsh-orange)](#deepseek-harness-插件面)
[![license](https://img.shields.io/badge/license-MIT-lightgrey)](#license)

---

## 📑 目录

- [介绍](#介绍)
- [工作原理](#工作原理)
- [安装](#安装)
- [快速上手](#快速上手)
- [技能清单](#技能清单)
- [目录结构](#目录结构)
- [更新](#更新)
- [贡献](#贡献)
- [FAQ](#faq)
- [License](#license)

## 介绍

**cc-kit** 把"调试、架构、设计、WSL 环境、文案审校"等高频 AI 工作流,沉淀成**开箱即用技能**的合集包。v4.0.0 起并入 **Anthropic 官方 Skills 包**,并新增 **DeepSeek Harness 插件面**——一套技能,多端可用。

> ⚠️ **免责声明**:包内技能由 AI 驱动,输出可能不完美;涉及生产操作(连库、删改、发布)请人工审查,高危操作遵循各技能内置的安全红线条款。

## 工作原理

![架构与分发](./docs/arch.png)

| 目标 | 形态 | 技能数 | 隔离 |
|---|---|---|---|
| Claude Code / Cursor | marketplace 插件 | 35 | 插件目录 |
| DeepSeek Harness | bundle 插件(vendor/cc-kit-dsh) | 36(含元技能) | ✅ 包内,零 canonical 污染 |
| 共享技能库 | `~/.agents/skills` | 按需 | 平铺(可选) |

文字版:技能 = SKILL.md(+参考/脚本)。Claude 侧走 marketplace 自动发现;DSH 侧经 `cordis.patch.yml` 注册 `dsh-skill-filesystem` 加载器,指向包内 skills,与全局目录互不污染。

## 安装

### Claude Code(推荐)

```bash
claude plugin marketplace add github:gx-zyl/cc-kit
```

### 其他 Claude 兼容工具(Cursor 等)

经 `~/.agents/skills` 共享(junction/复制),见仓库 `tools/` 说明。

### DeepSeek Harness(插件面,隔离)

```jsonc
// ~/.dsh/profiles/web/package.json
"dependencies": { "cc-kit-dsh": "link:/your/path/cc-kit/integrations/deepseek-harness" },
"dsh.profile.bundles": [ ..., "cc-kit-dsh" ]
```

```bash
cd ~/.dsh/profiles/web && pnpm install --offline
dsh --profile web --dump-config   # 应见 # == cc-kit-dsh
```

> ⚠️ 重启前必过预检(规则"修改后验证+全局记录制度"),未过禁止重启。

### 开发/自测

```bash
git clone https://github.com/gx-zyl/cc-kit.git
cd plugins/cc-kit && claude --plugin-dir .
```

## 快速上手

1. **装好**(按上面任一种)
2. **触发**:直接说需求,如"**诊断一下**这个报错"(→ diagnose)、"**拷打**这个方案"(→ grill-me)、"帮我**交接**"(→ handoff)
3. **看说明**:`cc-kit` 元技能列出全部技能与触发词
4. **沉淀**:grow-dream 把对话新模式写回 globals

## 技能清单

![技能全景](./docs/skills-map.png)

### A. 思维与沟通(10)

| Skill | 一句话 | 触发场景 |
|---|---|---|
| diagnose | 6 阶段系统调试法 | 查 bug / 崩了 / 性能下降 |
| grill-me | AI 拷打设计 | 审方案 / 帮我审审 |
| grill-with-docs | 文档拷打 + ADR 沉淀 | 用文档审方案 |
| handoff | 交接文档(带推荐技能) | 交接 / 总结对话 |
| grow-dream | 对话回顾→规则沉淀 | 沉淀 / 造梦 / 提炼经验 |
| write-a-skill | 创建自定义 SKILL | 写 skill |
| karpathy-guidelines | LLM 编码行为指南 | 谨慎写 / 不过度设计 |
| prototype | 快速原型验证 | 搭原型 / 验证设计 |
| github-repo | 仓库创建 + CI | 创建 repo / push |
| improve-codebase-architecture | 架构改进与重构 | 改进架构 |

### B. 开发与架构(4)

| Skill | 用途 |
|---|---|
| api-design | REST API 设计模式 |
| architecture-decision-records | ADR 格式与流程 |
| docker-patterns | Docker/Compose 模式 |
| **cc-kit**(元技能) | 包自述 + 技能导航 |

### C. WSL 环境(2)

| Skill | 用途 |
|---|---|
| chrome-devtools-wsl | Chrome CDP 桥接(WSL→Windows) |
| wsl-network | WSL 网络代理 + 防火墙 |

### D. Anthropic 官方(19)

| 分组 | 技能 |
|---|---|
| 📄 文档 | docx / pptx / xlsx / pdf |
| 🔌 生态 | mcp-builder / skill-creator |
| 🧪 测试/API | webapp-testing / claude-api |
| 🎨 设计 | canvas-design / theme-factory / web-artifacts-builder / frontend-design / algorithmic-art / brand-guidelines / slack-gif-creator |
| 💬 沟通 | internal-comms / doc-coauthoring / discernment-nudge / academy-guide |

## 目录结构

```
cc-kit/
├── .claude-plugin/marketplace.json      # Claude 市场入口
├── plugins/cc-kit/
│   ├── .claude-plugin/plugin.json       # v4.0.0
│   ├── skills/  (35)                    # 自研 16 + 官方 19
│   ├── rules/   (2)                     # proxy / wsl-cli
│   ├── CLAUDE.md / CHANGELOG.md
├── docs/                                # 架构图 / 技能全景
└── integrations/deepseek-harness/      # DSH 面:skills 36 + cordis.patch.yml
```

## 更新

- **Claude Code**:marketplace 安装时自动管理,`/plugin` 查看
- **DSH**:复制新技能到 `vendor/cc-kit-dsh/skills/` → `pnpm install` → 预检 → 重启
- **手动克隆**:`git pull`(本仓库根)

## 贡献

1. 新增技能:目录 `skills/<kebab-name>/SKILL.md`(frontmatter 含 name/description/触发词)
2. 改技能:先读《图解Skill》三问 + Anthropic `skill-creator` 规范
3. 提交:fork → 分支 → PR;README/CHANGELOG 同步一行
4. 规则:改动产线规则(高危操作)必须附安全红线说明

## FAQ

- **装完不生效?** → Claude:检查 `/plugin` 列表与 `~/.claude/skills`;DSH:`dump-config` 是否含 `cc-kit-dsh`,重启后再看技能清单
- **与全局技能重复?** → DSH 面是隔离加载;canonical 旧副本请移入备份目录(做法见 CHANGELOG 2026-08-30)
- **想改触发词?** → 编辑 SKILL.md frontmatter 的 description(影响命中率的唯一开关)

## License

MIT — 详情见 [LICENSE](./plugins/cc-kit/LICENSE)。第三方技能版权归各自作者(Anthropic 官方技能遵循其仓库许可)。

---
*Made with plantuml + DeepSeek Harness | 维护人:磨砖做镜(谷晓刚)*