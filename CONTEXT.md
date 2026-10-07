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
| **最小适配（A）** | 入库只做 4 件必要事：目录拍平、frontmatter 只留 DSH 认可键、`description` 中文、正文内 `.claude/` 类路径改写；非必要不改写正文。**两款登记在案的例外**：① 上游 Claude Code / 其他 runner 的语境没有 DSH 等价物、无法改写时，加**显式横幅标注**（仍不改写正文）；② 上游自带的 `agents/openai.yaml`（19 个，Codex 面向）既不消费也不删，仅登记为「已知上游附带文件」——它是 D8 判据的独立旁证（见末行） | ≠ 深度 DSH 化；≠ 原样照抄；≠ 顺手删上游附带文件 |
| **DSH 认可键** | `name`、`description`（必填）+ `whenToUse`、`metadata`、`disable-model-invocation`、`user-invocable`（可选）。**未认可的上游杂键**（`license`/`tools`/`allowed-tools`/`argument-hint`…）被**静默忽略**（死元数据，不影响加载）。**legacy 键** `disableModelInvocation`/`modelInvocable`/`userInvocable` 让该技能**被整体丢弃**：`skill-filesystem` 内部虽 throw，但调用点 catch 后 `return undefined` 并只留一条 warn 日志（fail-silent，**不是**启动报错） | ≠ 上游杂键；≠「legacy 键 = 启动报错」 |
| **拍平（flatten）** | 技能必须是 `skills/<name>/SKILL.md` 一层；DSH **不发现嵌套 `**/SKILL.md`** | ≠ mp 的 `skills/<cat>/<name>/` 两层 |
| **机制型技能** | 依赖 Claude Code 专有机制的技能（`tools`/`allowed-tools`/`argument-hint`/hooks/slash-command 串联 `Skill` 工具），需**逐个判定**改写或排除 | ≠ 纯 prompt 型技能 |
| **用户调用型 / 模型调用型（D8）** | 上游 `mattpocock/skills` 的成文二分：user-invoked（`disable-model-invocation: true`，只有人打字能触发，`description` 写成**给人看的一行摘要**）vs model-invoked（省略该键，描述保留触发语供模型自主调用）。判据是**"模型能否自主且有益地调用它"**。本包这 8 条的 `description` 实际形态是「**一行摘要 + 一句机制尾注**」（如"…用来打磨思路。用户调用型技能：仅经 /grill-me 触发，不进模型可见目录。"），尾注只给人看、不是给模型的触发语。另：`user-invocable` 在 DSH 默认 `true`，本包 92 个技能**都没显式设置** ⇒ 全部对用户可调用，D8 的二分实际落在 `modelInvocable` 上 | ≠ 以「包内历史有没有」判定（因果颠倒）；≠ 全摘掉（偏离上游策略）；≠ 尾注= 触发语。本包 8 个用户调用型：`grill-me`/`grill-with-docs`/`handoff`/`improve-codebase-architecture`/`retro`/`triage`/`to-spec`/`to-tickets`；上游 `agents/openai.yaml` 里同样 8 个标 `allow_implicit_invocation: false`，与本包一致 |

