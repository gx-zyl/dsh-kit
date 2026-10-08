---
name: github-repo
description: Create a private/public GitHub repository, push existing code, and configure CI. Triggers when the user says "create a repo", "new repo", "push to GitHub", or "initialize a repository". 创建 GitHub 私有/公开仓库、推送已有代码、配置 CI。用户说"创建仓库"、"新建 repo"、"push 到 GitHub"、"初始化仓库"时触发。
---

# github-repo — GitHub repository creation & initialization

## Prerequisites

The `gh` CLI must be logged in:

```pwsh
gh auth status
# if not logged in: gh auth login
```

## Workflow

### Step 1 — Create the repository

```pwsh
# private repository (default)
gh repo create <name> --private --source=. --push --remote origin

# public repository
gh repo create <name> --public --source=. --push --remote origin

# create only (do not push code)
gh repo create <name> --private
```

Parameter reference:

| Parameter | Effect |
|------|------|
| `--private` / `--public` | repository visibility |
| `--source=.` | initialize from the contents of the current directory |
| `--push` | push automatically |
| `--remote origin` | remote name |
| `--description "..."` | repository description |

### Step 2 — Repository exists but has no remote

```pwsh
gh repo create <name> --private
git remote add origin https://github.com/<user>/<name>.git
git push -u origin main
```

### Step 3 — Optional: add CI

```pwsh
mkdir -p .github/workflows
# Node.js CI example
@'
name: CI
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v6
      - uses: actions/setup-node@v6
        with: { node-version: '22' }
      - run: npm ci
      - run: npm test
'@ > .github/workflows/ci.yml
git add .github/ && git commit -m "chore: add CI" && git push
```

### Step 4 — Optional: branch protection

```pwsh
gh api repos/:owner/:repo/branches/main/protection \
  --method PUT \
  --input '{"required_status_checks": null, "enforce_admins": true, "required_pull_request_reviews": {"required_approving_review_count": 1}}'
```

## Common scenarios

### Push an existing project to a private repository

```pwsh
cd my-project
git init && git add . && git commit -m "init"
gh repo create my-project --private --source=. --push
```

### Create from scratch

```pwsh
gh repo create my-project --private --clone
cd my-project
# development...
git add . && git commit -m "init" && git push
```
