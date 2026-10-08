---
name: wsl-network
description: WSL networking toolkit — get the Windows host IP and configure HTTP/SOCKS5 and Git global proxies. Triggers when the user mentions WSL network, proxy, VPN, or network configuration. WSL 网络工具集 — 获取 Windows 主机 IP、配置 HTTP/SOCKS5 代理、Git 全局代理。用户说 WSL 网络、代理、proxy、VPN、网络配置时触发。
---

# WSL Network

WSL networking toolkit: get the Windows host IP + configure proxies.

## Trigger conditions

- WSL, wsl2, network
- proxy, proxy port
- VPN, circumvention, fq
- host IP, host ip

## Get the Windows host IP

```bash
cat /etc/resolv.conf | grep nameserver | awk '{print $2}'
```

Or via the gateway:

```bash
ip route show | grep default | awk '{print $3}'
```

The returned value is usually `172.x.x.x`; it is referred to below as `WIN_IP`.

## Proxy configuration

| Setting | Value |
|--------|-----|
| Windows host IP | `$(ip route show default | awk '{print $3}')` (resolved dynamically) |
| SOCKS5 port | `9909` |
| HTTP proxy port | `9910` |

### One-off use

```bash
# Git through the HTTP proxy
HTTPS_PROXY=http://WIN_IP:9910 git clone https://github.com/user/repo.git

# curl test
curl -I --proxy http://WIN_IP:9910 https://www.google.com
curl -I --proxy socks5://WIN_IP:9909 https://www.google.com
```

### Persistent configuration

Add to `~/.bashrc` or `~/.zshrc`:

```bash
export HTTPS_PROXY=http://WIN_IP:9910
export ALL_PROXY=socks5://WIN_IP:9909
```

### Git global proxy

```bash
git config --global http.proxy http://WIN_IP:9910
git config --global https.proxy http://WIN_IP:9910
```

### Verify

```bash
curl -I --proxy http://WIN_IP:9910 https://www.google.com
```
