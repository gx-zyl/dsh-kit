---
name: chrome-devtools-wsl
description: Drive Windows Chrome — navigation/screenshots/JS/CDP/API bridging, replacing the web-access CDP Proxy. Triggers when the user mentions driving Chrome, browser automation, CDP, or devtools. 操控 Windows Chrome — 导航/截图/JS/CDP/API 桥接，替代 web-access CDP Proxy。用户说操控 Chrome、浏览器自动化、CDP、devtools 时触发。
---

# Chrome DevTools for WSL

PowerShell → Windows Python → CDP to drive Chrome. No relay needed, no firewall dependency.

## First-time setup

On first use, copy `.env.example` to `.env` and edit it (`just` loads it automatically):

| Variable | Default | Description |
|------|--------|------|
| `CCW_DIR` | `D:\chrome-devtools-wsl` | Windows working directory (script deployment + Chrome profile) |
| `PYWIN` | auto-detected | Windows Python (leave empty and PowerShell resolves `(Get-Command python.exe).Source` automatically) |
| `CDP_PORT` | `9222` | Chrome DevTools port |

Usually you only need to confirm that `CCW_DIR` points at a path you can write to; everything else is auto-detected.

## Commands

```bash
# skill directory = the base directory reported by DSH (…/skills/chrome-devtools-wsl)
cd <skill directory>

just start          start Chrome (with remote-debugging)
just stop           stop Chrome
just status         show status
just nav <url>      open a URL (defaults to chatgpt.com)
just shot [name]    screenshot
just eval <js>      execute JS
just ask "question" ask ChatGPT a question
just serve          start the web-access compatible API (localhost:3456)
```

## Architecture

```
WSL                            Windows
─────────────────              ───────────────
just nav                        Chrome
  ↓                             (127.0.0.1:9222)
cdp-bridge.py (3456)                ↑
  ↓                             chrome_debug.py
PowerShell ───────────────►     Windows Python → CDP
```

## Reference files

The package root's `rules/` ships the following rule files with the package; consult them directly by relative path (DSH has no registration step):

- `../../rules/wsl-cli-tools.md` — WSL modern CLI toolchain mapping table

This skill inlines the key rule content; the rule file can serve as further reference.

## Relationship to web-access

| web-access component | chrome-devtools-wsl replacement |
|----------------|---------------------------|
| CDP Proxy (cdp-proxy.mjs) | `just serve` → cdp-bridge.py (compatible with the same curl API) |
| Chrome lifecycle | `just start/stop` |
| Browsing philosophy / site experience | **Not replaced**; keep using web-access |

Start Chrome → `just start`, then `just serve` to start the API bridge; web-access's curl scripts work unchanged.
