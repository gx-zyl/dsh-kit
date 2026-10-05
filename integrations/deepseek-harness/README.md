# dsh-kit — DeepSeek Harness 技能包

dsh-kit 的 **DSH bundle 形态**：**16 个 DSH 原生技能**隔离在包内，经 bundle patch 聚合加载，`~/.agents/skills` 零污染。

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
|----|----|
| 包名 | `dsh-kit` |
| 版本 | 5.0.0 |
| 技能 | 16（15 个能力技能 + 元技能 `dsh-kit`） |
| 参考文件 | `rules/`（2）、`references/`（1） |
| 运行期服务 | 无（`lib/index.js` 为空实现） |
| 来源 | DSH 原生 |

## 校验

```powershell
dsh plugin --profile <profile> list --depth 0
```

应看到 `dsh-kit@link:<本仓库>/integrations/deepseek-harness`；会话技能目录中出现 `dsh-kit`、`diagnose`、`grow-dream` 等即加载成功。

> 版本:5.0.0 | 技能:16 | 来源:DSH 原生
