---
name: handoff
description: "把当前对话压缩成交接文档，供另一个 agent 接手继续。用户调用型技能：仅经 /handoff 触发，不进模型可见目录。"
metadata:
  origin: mp-skills
  upstream: mattpocock/skills
  snapshot: 24fe0ef7737e
disable-model-invocation: true
---
Write a handoff document summarising the current conversation so a fresh agent can continue the work. Save to the temporary directory of the user's OS - not the current workspace.

Include a "suggested skills" section in the document, naming which skills the next agent should call the skill tool for.

Do not duplicate content already captured in other artifacts (specs, plans, ADRs, issues, commits, diffs). Reference them by path or URL instead.

Redact any sensitive information, such as API keys, passwords, or personally identifiable information.

If the user passed arguments, treat them as a description of what the next session will focus on and tailor the doc accordingly.
