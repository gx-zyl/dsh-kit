# 代理管理

- 默认不启用 `HTTP_PROXY` / `HTTPS_PROXY`
- 需要访问外网时临时启用：
  ```pwsh
  $env:HTTP_PROXY = 'http://127.0.0.1:9910'
  $env:HTTPS_PROXY = 'http://127.0.0.1:9910'
  ```
  ```bash
  export HTTP_PROXY='http://127.0.0.1:9910'
  export HTTPS_PROXY='http://127.0.0.1:9910'
  ```
- 用完即时取消：
  ```pwsh
  Remove-Item Env:HTTP_PROXY, Env:HTTPS_PROXY
  ```
  ```bash
  unset HTTP_PROXY HTTPS_PROXY
  ```
- 浏览器走 PAC 自动分流（`proxy.pac`），不依赖环境变量

## DSH 插件包操作与代理

`dsh plugin` 与 profile 内的 `pnpm add/remove` 都要访问 npm 源与 GitHub，以下操作需临时启用代理：

| 操作 | 命令 |
|------|------|
| 安装/移除插件包 | `dsh plugin --profile <profile> add <spec>` / `remove <包名>` |
| 查看已装依赖 | `dsh plugin --profile <profile> list --depth 0` |
| 重新解析依赖 | 在 `$DSH_HOME/profiles/<profile>` 下执行 `pnpm install` |
| `link:` 本地包升级 | 在包源码目录执行 `git pull`（DSH 直接读源目录，无需重装） |

- 本地 `link:` 安装的包（如 `dsh-kit`）改动源码后由 profile 的包清单变更触发重载；仅改包内文件时 DSH 的 HMR 会自行重载，无需重启桌面端。
