# dsh-kit — DeepSeek Harness 技能包

dsh-kit 的 **DSH bundle 形态**：**92 个技能**隔离在包内，经 bundle patch 聚合加载，`~/.agents/skills` 零污染。

## 安装

```powershell
dsh plugin --profile <profile> add "<本仓库>/integrations/deepseek-harness"
```

等价的手工写法（写进 `$DSH_HOME/profiles/<profile>/package.json`）：

```jsonc
"dependencies": { "dsh-kit": "link:<本仓库>/integrations/deepseek-harness" },
"dsh.profile.bundles": [ ..., "dsh-kit" ]
```

包清单变化后由 DSH 重载生效；HMR 未接管时重启 DSH。

## 加载方式

`cordis.patch.yml` 插入一行 `dsh-kit-skill-filesystem`，使用 `@deepseek-ai/dsh-skill-filesystem`：

- `providerName: dsh-kit`
- `includeDefaultRoots: false` —— 项目根、用户根、`$DSH_BUNDLED_SKILL_DIR` 均不参与，只加载本包 `skills/`
- `bundledSkillDir` 经 `createRequire(baseUrl).resolve('dsh-kit/package.json')` 解析，不写死路径

| 项 | 值 |
|---|---|
| 包名 | `dsh-kit` |
| 版本 | 6.0.0 |
| 技能 | 92（8 包内自有 + 84 上游合并） |
| 上游 | `affaan-m/ECC` 59；`mattpocock/skills` 19；`thedotmack/claude-mem` 6；`alibaba/open-code-review` 0 |
| 参考文件 | `rules/`（2）、`references/`（grow-dream 类型定义 1 + 上游来源登记 5） |
| 运行期服务 | 无（`lib/index.js` 为空实现） |
| frontmatter 认可键 | `name`、`description`、`metadata`、`disable-model-invocation`、`user-invocable` |

## 校验

```powershell
dsh plugin --profile <profile> list --depth 0
```

应看到 `dsh-kit@link:<本仓库>/integrations/deepseek-harness`；会话技能目录中出现 `dsh-kit`、`code-review`、`tdd` 等即加载成功。

包内自查（无需 DSH 运行）：

```powershell
node tools/validate-package.ts
```

## 上游来源

见 `references/upstream-sources.md`（索引）与 `upstream-ecc.md`、`upstream-mp-skills.md`、`upstream-claude-mem.md`、`upstream-ocr.md`。

> 版本:6.0.0 | 技能:92 | 上游:ECC/mattpocock/claude-mem（+ open-code-review 仅参考资料）
