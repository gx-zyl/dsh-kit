# 参考资料 mp-24fe0ef — Matt Pocock's Skills

> 本文件由 `dsh-kit` 维护，随包分发。只登记**上游来源与取用范围**，不含技能正文；
> 技能执行请见 `skills/`，包内隔离加载（provider `dsh-kit`，`includeDefaultRoots: false`）。


## 引用条目

- **标题**：Matt Pocock's Skills
- **作者/维护者**：`mattpocock`（Matt Pocock，GitHub 用户）
- **载体**：GitHub 开源仓库（agent 技能集）
- **快照（本包取用版本）**：`main` @ `24fe0ef7737e`，提交时间 `2026-10-04T13:48:05+01:00`
- **获取方式/时间**：`git clone --depth 1`，2026-10-05（本机经代理 `http://127.0.0.1:9910`）
- **许可**：MIT（上游 `LICENSE`，版权行 `Copyright (c) 2026 Matt Pocock`；本包随附许可正文：`../LICENSES/MIT-mattpocock-skills.txt`）
- **URL**：https://github.com/mattpocock/skills
- **引用键**：`mp-24fe0ef`

## 取用范围（19 个技能）

| # | 技能 | 上游路径 | 处置 |
|---|---|---|---|
| 1 | `grill-me` | `mp-skills/skills/productivity/grill-me` | 覆盖既有的同名技能（D2=C 上游为准） |
| 2 | `grill-with-docs` | `mp-skills/skills/engineering/grill-with-docs` | 覆盖既有的同名技能（D2=C 上游为准） |
| 3 | `handoff` | `mp-skills/skills/productivity/handoff` | 覆盖既有的同名技能（D2=C 上游为准） |
| 4 | `improve-codebase-architecture` | `mp-skills/skills/engineering/improve-codebase-architecture` | 覆盖既有的同名技能（D2=C 上游为准） |
| 5 | `prototype` | `mp-skills/skills/engineering/prototype` | 覆盖既有的同名技能（D2=C 上游为准） |
| 6 | `code-review` | `mp-skills/skills/engineering/code-review` | 新增 |
| 7 | `codebase-design` | `mp-skills/skills/engineering/codebase-design` | 新增 |
| 8 | `domain-modeling` | `mp-skills/skills/engineering/domain-modeling` | 新增 |
| 9 | `grilling` | `mp-skills/skills/productivity/grilling` | 新增 |
| 10 | `research` | `mp-skills/skills/engineering/research` | 新增 |
| 11 | `pr` | `mp-skills/skills/engineering/pr` | 新增 |
| 12 | `retro` | `mp-skills/skills/engineering/retro` | 新增 |
| 13 | `tdd` | `mp-skills/skills/engineering/tdd` | 新增 |
| 14 | `to-spec` | `mp-skills/skills/engineering/to-spec` | 新增 |
| 15 | `to-tickets` | `mp-skills/skills/engineering/to-tickets` | 新增 |
| 16 | `triage` | `mp-skills/skills/engineering/triage` | 新增 |
| 17 | `writing-for-agents` | `mp-skills/skills/productivity/writing-for-agents` | 新增 |
| 18 | `setup-pre-commit` | `mp-skills/skills/misc/setup-pre-commit` | 新增 |
| 19 | `wizard` | `mp-skills/skills/engineering/wizard` | 新增 |

## 未取用说明

- 上游规范技能目录共 **37** 个（上游 `skills/` 37 个，分 engineering / in-progress / misc / productivity 四类）。
- 本包取用 **19** 个，其余未取用。
- 排除原因按 D1 标准聚合：workspace 专属装配（`setup-matt-pocock-skills`、`ask-matt`、`loop-me`）、绑定第三方系统（`setup-ts-deep-modules` 的 dependency-cruiser、`migrate-to-shoehorn`）、写作流程系列（`writing-beats`/`writing-fragments`/`writing-shape`）与 `implement*`/`wait-what` 等薄壳。

## 署名与合规

- 本包对这些技能的**结构适配与语言处置**由 dsh-kit 完成：目录拍平、frontmatter 规整、Claude Code 专有路径与工具名 → DSH 等价物（**例外**：主语是 Claude Code 本身或跨 harness 并列时保留原名）、死链中性化、**英文** CC 语境横幅、`description` 英中双语（英文侧 = 上游折叠成一行 + 中文触发语）；
- 技能**正文以英文呈现**（英文= 上游逐字为底，仅叠加上述最小适配）；**参考文件与脚本按上游保留**（本轮无例外；若有例外，逐条登记在 `../THIRD-PARTY-NOTICES.md`）；版权归上游作者；
- 再分发遵循上游 MIT 许可；若上游许可变更或要求撤回，删除对应 `skills/<name>/` 即可，不影响其余技能。
