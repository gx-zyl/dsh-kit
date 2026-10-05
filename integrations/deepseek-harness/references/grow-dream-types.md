# grow-dream 候选类型定义

grow-dream 步骤④（提炼分类）和步骤⑧（追问验收）共享的类型体系。

## 类型总表

| 类型 | 本质 | 判定条件 | DSH 产出路径 |
|------|------|---------|-------------|
| **skill** | 场景化的解题套路 | 有判断分支、需上下文理解、特定场景复用 | 项目级 `<项目>/.dsh/skills/<name>/`；用户级 `$DSH_HOME/skills/<name>/`（含 `SKILL.md`） |
| **command** | 确定性操作序列 | 步骤固定 ≤7 步、重复 ≥2 次、无分支判断 | 同 skill（DSH 无独立 command 机制，确定性流程也做成 skill） |
| **rule** | 跨项目通用行为约束 | 不引用具体路径/命令、描述通用约束 | 跨项目 → `$DSH_HOME/AGENTS.md`；项目内 → `<项目>/AGENTS.md` |
| **agent** | 持续运行的有限角色 | 有独立决策自主权、角色边界明确 | `$DSH_HOME/.agent-presets/<name>/`（`preset.yml` + `agent.cordis.yml`） |
| **hook** | 事件驱动的自动化 | 纯后台、≤3s 执行、失败不影响主流程 | `hooks.json`（由 profile 中的 hook 桥接 bundle 读取；仅 command 钩子生效） |
| **memory** | 跨会话持久化记忆 | 频次 ≥2、跨会话通用、不重复已有 | `memory/<name>.md` + `MEMORY.md` 索引 |
| **doc** | 仅当前项目有效的文档 | 非通用性、仅 `docs/` 相关 | 按需 |

## 用法

- **步骤④（提炼分类）**：根据对话模式判定归属哪一类型，按分类规则执行
- **步骤⑧（追问验收）**：按类型对应的验收维度和判定标准逐一追问

> 新增类型时在此文件添加一行，无需修改 grow-dream 主流程。
