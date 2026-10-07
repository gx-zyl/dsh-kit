# 参考资料 ocr-182898c — Open Code Review (OCR)

> 本文件由 `dsh-kit` 维护，随包分发。只登记**上游来源与取用范围**，不含技能正文；
> 技能执行请见 `skills/`，包内隔离加载（provider `dsh-kit`，`includeDefaultRoots: false`）。


## 引用条目

- **标题**：Open Code Review (OCR)
- **作者/维护者**：阿里巴巴（`alibaba`，GitHub 组织）
- **载体**：GitHub 开源仓库（agent 技能集）
- **快照（本包取用版本）**：`main` @ `182898cf522d`，提交时间 `2026-10-05T14:34:14+08:00`
- **获取方式/时间**：`git clone --depth 1`，2026-10-05（本机经代理 `http://127.0.0.1:9910`）
- **许可**：Apache-2.0（上游 `LICENSE`，附录版权行 `Copyright 2026 alibaba/open-code-review Contributors`；本包**未分发该上游任何内容**，故不单列许可副本，Apache-2.0 正文见 `../LICENSES/Apache-2.0.txt`）
- **URL**：https://github.com/alibaba/open-code-review
- **引用键**：`ocr-182898c`

## 取用范围（0 个技能）

**本上游未取用任何技能**（原因见下节）。

## 未取用说明

- 上游规范技能目录共 **2** 个（上游 `skills/` 2 个，均为 `ocr` Go CLI 的调用封装）。
- 本包取用 **0** 个，其余未取用。
- 未取用的 **2** 个技能（`open-code-review`、`open-code-review-delegate`）都是 **`ocr` Go CLI 的调用封装**（frontmatter 带 `allowed-tools`、正文以 bash 调 `ocr`）：
  - 按本包术语「**工具本体不进技能面**」，二者不复制进 `skills/`；
  - 需要用时请先安装上游 CLI（见其仓库 `install.sh` / `install.ps1`），再由本文件与上游 README 指导调用；
  - 该判断记录于 `CONTEXT.md` 的「**工具本体**」词条（本仓无「合并清单」文件，原 §5-3 引用已失效）；若后续要改为技能面收录，需重新裁决。

## 署名与合规

- 本上游取用 **0** 个，本包未分发其任何内容，因此**不存在**翻译（description）或结构适配工作；
- 技能**正文、参考文件与脚本保持上游原文**，版权归上游作者；
- 再分发遵循上游 Apache-2.0 许可；若上游许可变更或要求撤回，删除对应 `skills/<name>/` 即可，不影响其余技能。
