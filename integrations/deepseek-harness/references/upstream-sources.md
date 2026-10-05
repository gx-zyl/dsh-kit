# dsh-kit 上游来源登记（参考资料索引）

> 本文件由 `dsh-kit` 维护，随包分发。只登记**上游来源与取用范围**，不含技能正文；
> 技能执行请见 `skills/`，包内隔离加载（provider `dsh-kit`，`includeDefaultRoots: false`）。


## 引用总表

| 引用键 | 上游 | 快照 | 许可 | 地址 | 取用技能数 |
|---|---|---|---|---|---|
| `ecc-ef648e0` | ECC — Engineering Context Collection | `ef648e01899b` | MIT | https://github.com/affaan-m/ECC | 59 |
| `mp-24fe0ef` | Matt Pocock's Skills | `24fe0ef7737e` | MIT | https://github.com/mattpocock/skills | 19 |
| `cmem-3b3baaa` | claude-mem | `3b3baaa55ebb` | Apache-2.0 | https://github.com/thedotmack/claude-mem | 6 |
| `ocr-182898c` | Open Code Review (OCR) | `182898cf522d` | Apache-2.0 | https://github.com/alibaba/open-code-review | 0 |

## 分册

- [`ecc-ef648e0`](upstream-ecc.md) — ECC — Engineering Context Collection
- [`mp-24fe0ef`](upstream-mp-skills.md) — Matt Pocock's Skills
- [`cmem-3b3baaa`](upstream-claude-mem.md) — claude-mem
- [`ocr-182898c`](upstream-ocr.md) — Open Code Review (OCR)

## 取用与处置约定

| 项 | 约定 |
|---|---|
| 选中技能 | 目录拍平为 `skills/<name>/SKILL.md`（DSH 只发现这一层） |
| frontmatter | 只保留 DSH 认可键：`name`、`description`（+ 可选 `metadata`、`disable-model-invocation`、`user-invocable`）；上游杂键在此登记，不再随技能保留 |
| `description` | 中文触发语（召回用）；正文保持上游原文 |
| 署名 | 每个技能的 `metadata.origin` / `metadata.upstream` / `metadata.snapshot` 指向本表条目 |
| 未选中技能 | 不复制进包；原因见各分册「未取用说明」 |
| 工具本体 | 上游的可执行服务/CLI/hooks 不进技能面（见 `upstream-ocr.md`） |
