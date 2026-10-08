---
name: research
description: "Investigate a question against high-trust primary sources and capture the findings as a Markdown file in the repo. Use when the user wants a topic researched, docs or API facts gathered, or reading legwork delegated to a background agent. 针对高可信一手来源做调研，并把结论落成仓库内的 Markdown 文件。用户要求调研主题或查文档时触发。"
metadata:
  origin: mp-skills
  upstream: mattpocock/skills
  snapshot: 24fe0ef7737e
---


Spin up a **background agent** to do the research, so you keep working while it reads.

Its job:

1. Investigate the question against **primary sources** (official docs, source code, specs, first-party APIs), not a secondary write-up of them. Follow every claim back to the source that owns it.
2. Write the findings to a single Markdown file, citing each claim's source.
3. Save it where the repo already keeps such notes; match the existing convention, and if there is none, put it somewhere sensible and say where.
