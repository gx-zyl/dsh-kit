---
name: safety-guard
description: "危险操作护栏三模式：拦截 rm -rf、git push --force、DROP TABLE 等命令待确认，冻结写操作，或落地审计记录。"
metadata:
  origin: ecc
  upstream: affaan-m/ECC
  snapshot: ef648e01899b
---

> ⚠ **DSH 语境（dsh-kit 适配 · 2026-10-06）**：本技能正文来自上游（`affaan-m/ECC`），其中
> `~/.claude/…` / `.claude/…` / `hooks/hooks.json`（Claude Code 形态）是**上游的落点与机制**，
> DSH 侧**没有同名落点**（实测 `~/.dsh/settings.json` 不存在）。DSH 的两处真实等价物：技能目录
> `~/.agents/skills`、钩子 `hooks.json`（由 profile 的 hook 桥接 bundle 读取，**仅 command 钩子生效**）。
> ⇒ **本节示例请勿直接套用**；要落地请按上面两处改写，或改用 DSH 自身的插件配置。
# Safety Guard — Prevent Destructive Operations

## When to Use

- When working on production systems
- When agents are running autonomously (full-auto mode)
- When you want to restrict edits to a specific directory
- During sensitive operations (migrations, deploys, data changes)

## How It Works

Three modes of protection:

### Mode 1: Careful Mode

Intercepts destructive commands before execution and warns:

```
Watched patterns:
- rm -rf (especially /, ~, or project root)
- git push --force
- git reset --hard
- git checkout . (discard all changes)
- DROP TABLE / DROP DATABASE
- docker system prune
- kubectl delete
- chmod 777
- sudo rm
- npm publish (accidental publishes)
- Any command with --no-verify
```

When detected: shows what the command does, asks for confirmation, suggests safer alternative.

### Mode 2: Freeze Mode

Locks file edits to a specific directory tree:

```
/safety-guard freeze src/components/
```

Any Write/Edit outside `src/components/` is blocked with an explanation. Useful when you want an agent to focus on one area without touching unrelated code.

### Mode 3: Guard Mode (Careful + Freeze combined)

Both protections active. Maximum safety for autonomous agents.

```
/safety-guard guard --dir src/api/ --allow-read-all
```

Agents can read anything but only write to `src/api/`. Destructive commands are blocked everywhere.

### Unlock

```
/safety-guard off
```

## Implementation

Uses PreToolUse hooks to intercept Bash, Write, Edit, and MultiEdit tool calls. Checks the command/path against the active rules before allowing execution.

## Integration

- Enable by default for `codex -a never` sessions
- Pair with observability risk scoring in ECC 2.0
- Logs all blocked actions to `~/.claude/safety-guard.log`
