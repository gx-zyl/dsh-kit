# 参考资料 cmem-3b3baaa — claude-mem

> 本文件由 `dsh-kit` 维护，随包分发。只登记**上游来源与取用范围**，不含技能正文；
> 技能执行请见 `skills/`，包内隔离加载（provider `dsh-kit`，`includeDefaultRoots: false`）。


## 引用条目

- **标题**：claude-mem
- **作者/维护者**：`thedotmack`（GitHub 用户）
- **载体**：GitHub 开源仓库（agent 技能集）
- **快照（本包取用版本）**：`main` @ `3b3baaa55ebb`，提交时间 `2026-10-05T01:55:32-07:00`
- **获取方式/时间**：`git clone --depth 1`，2026-10-05（本机经代理 `http://127.0.0.1:9910`）
- **许可**：Apache-2.0（详见上游 `LICENSE`）
- **URL**：https://github.com/thedotmack/claude-mem
- **引用键**：`cmem-3b3baaa`

## 取用范围（6 个技能）

| # | 技能 | 上游路径 | 处置 |
|---|---|---|---|
| 1 | `session-handoff` | `claude-mem/plugin/skills/handoff` | 新增 |
| 2 | `design-is` | `claude-mem/plugin/skills/design-is` | 新增 |
| 3 | `what-the` | `claude-mem/plugin/skills/what-the` | 新增 |
| 4 | `learn-codebase` | `claude-mem/plugin/skills/learn-codebase` | 新增 |
| 5 | `standup` | `claude-mem/plugin/skills/standup` | 新增 |
| 6 | `babysit` | `claude-mem/plugin/skills/babysit` | 新增 |

## 未取用说明

- 上游规范技能目录共 **22** 个（上游 `plugin/skills/` 22 个；`claude-mem-cursor`、`cowork`、`openclaw` 等变体目录为其镜像）。
- 本包取用 **6** 个，其余未取用。
- 未取用的 **16** 个技能依赖 claude-mem 自身的 npm 服务与本地记忆库（`mem-search`、`timeline-report`、`weekly-digests`、`knowledge-agent`、`how-it-works`、`mode-creator`、`oh-my-issues`、`cloud-sync`、`ccs-align`、`agent-cost-report`、`pathfinder`、`smart-explore`、`version-bump`、`timeline-report` 等），进包会形成隐性外部依赖。
- 取用的 6 个均为**可脱离该服务独立运行**的纯文档型技能；`handoff` 因与 mattpocock 版同名不同物，改名为 `session-handoff`。

## 署名与合规

- 本包对这些技能的**翻译（description）与结构适配**（目录拍平、frontmatter 规整、路径改写）由 dsh-kit 完成；
- 技能**正文、参考文件与脚本保持上游原文**，版权归上游作者；
- 再分发遵循上游 Apache-2.0 许可；若上游许可变更或要求撤回，删除对应 `skills/<name>/` 即可，不影响其余技能。
