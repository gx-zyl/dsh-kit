# CONTEXT — dsh-kit 术语表

> 只放术语表，不放实现细节。由 `/grill-with-docs` 会话实时维护（术语一定下来就写，不攒批）。

| 术语 | 规范含义 | 易混 / 反例 |
|---|---|---|
| **技能（skill）** | 包内 `skills/<name>/SKILL.md` 为一个能力单元，DSH 经 `dsh-skill-filesystem` 隔离加载 | ≠ 上游仓库整体；≠ 工具本体 |
| **技能包（bundle）** | `integrations/deepseek-harness/` 这个 npm 包 `dsh-kit`，由 `cordis.patch.yml` 注册 | ≠ DSH profile |
| **上游（upstream）** | 本次纳入审核的四个仓库：`affaan-m/ECC`、`mattpocock/skills`、`thedotmack/claude-mem`、`alibaba/open-code-review` | ≠ 本包派生的中文快照 |
| **精选合并（A′+D）** | 按 5 条标准从上游 ~354 个技能中筛入；放宽保留语言生态类，排除行业/公司专用；**并全收 ECC 元技能/自评类 12 项** → 16 → **92** | ≠ 全量搬运（354）；≠ 只补不碰；≠ 收行业专用 |
| **中文辅助** | SKILL.md **正文保留上游原文**，中文只出现在元数据层（触发/召回用） | ≠ 中文化全文；≠ 双语逐段对照 |
| **参考资料卡** | `references/upstream-{ecc,ocr,mp-skills,claude-mem}.md` 四个源文件 + 一份索引，按**论文引用格式**登记（作者/载体/快照 SHA/许可/URL/取用范围/引用键） | ≠ 技能正文；≠ LICENSE 文件；≠ 单文件总表 |
| **工具本体** | 上游仓库里的可执行服务（OCR 的 Go 服务、claude-mem 的 npm 服务、ECC 的 hooks），**不进技能面** | ≠ 技能；≠ rules |
| **融合（merge）** | 同名技能与上游同源版本之间取上游为准（C 决策），中文仅作辅助 | ≠ 重命名；≠ 保留双份 |
| **最小适配（A）** | 入库只做 4 件必要事：目录拍平、frontmatter 只留 DSH 认可键、`description` 中文、正文内 `.claude/` 类路径改写；非必要不改写正文 | ≠ 深度 DSH 化；≠ 原样照抄 |
| **DSH 认可键** | `name`、`description`（必填）+ `whenToUse`、`metadata`、`disable-model-invocation`、`user-invocable`（可选）；legacy 键 `disableModelInvocation`/`modelInvocable`/`userInvocable` 会**抛错** | ≠ 上游杂键（`license`/`tools`/`allowed-tools`/`argument-hint`…） |
| **拍平（flatten）** | 技能必须是 `skills/<name>/SKILL.md` 一层；DSH **不发现嵌套 `**/SKILL.md`** | ≠ mp 的 `skills/<cat>/<name>/` 两层 |
| **机制型技能** | 依赖 Claude Code 专有机制的技能（`tools`/`allowed-tools`/`argument-hint`/hooks/slash-command 串联 `Skill` 工具），需**逐个判定**改写或排除 | ≠ 纯 prompt 型技能 |
| **模型可调用性（D8）** | `disable-model-invocation: true` 决定技能是否进入**模型可见目录**（不进则只能由用户经 `/` 调用）。本包**只对新增技能保留**该键（`retro`、`triage`、`to-spec`、`to-tickets`）；v5.0.0 已存在且模型可调用的 4 个（`grill-me`、`grill-with-docs`、`handoff`、`improve-codebase-architecture`）**不沿用**上游该键 | ≠ 全保留（会造成既有能力静默降级）；≠ 全摘掉（偏离上游"用户发起"意图） |

