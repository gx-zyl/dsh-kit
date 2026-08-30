# ⚡ cc-kit-dsh — DeepSeek Harness 插件面

cc-kit v4.0.0 的 **DSH 插件形态**:36 技能(cc-kit 16 + Anthropic 官方 19 + 元技能)**隔离在包内**,经 dsh bundle patch 聚合加载,`~/.agents/skills` 零污染。

![架构](D:/project/dsh1/cc-kit-expanded/docs/arch.png)

## 安装(profile)

```jsonc
"dependencies": { "cc-kit-dsh": "link:D:/project/dsh1/vendor/cc-kit-dsh" },
"dsh.profile.bundles": [ ..., "cc-kit-dsh" ]
```

```bash
cd ~/.dsh/profiles/web && pnpm install --offline && dsh --profile web --dump-config
```

重启 DSH 后生效。插件的 cordis.patch.yml 注册 `cc-kit-skill-filesystem` 加载器,技能由 provider 提供。

> 版本:4.0.0 | 技能:36 | 来源:gx-zyl/cc-kit + anthropics/skills
