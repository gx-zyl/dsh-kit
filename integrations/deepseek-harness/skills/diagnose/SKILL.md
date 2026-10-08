---
name: diagnose
description: A systematic debugging method for the reproduce → hypothesize → verify → fix → regress bug-hunting workflow. Triggers when the user says "diagnose this", "find the bug", "debug", "it crashed", or "performance dropped". 系统性调试法，用于复现→假设→验证→修复→回归的 bug 排查流程。用户说"诊断一下"、"查 bug"、"调试"、"崩了"、"性能下降"时触发。
---

# Diagnose — the six-step debugging method

When investigating code, read the project's domain glossary and understand the relevant modules.

## Phase 1 — Build a feedback loop

**This is the core skill.** If you have a fast, deterministic, AI-runnable pass/fail signal, you will find the cause. Without that signal, staring at the code is useless.

Spend the most effort here. **Do not give up until it works.**

### 10 ways to construct a loop (in priority order)

1. **Failing test** — unit/integration/e2e
2. **HTTP script** — curl against the dev service
3. **CLI invocation** — feed input, diff output
4. **Headless browser** — Playwright/Puppeteer
5. **Replay captured traffic** — save the real requests/logs, replay in isolation
6. **One-off harness** — minimal system + mocked dependencies
7. **Fuzz loop** — 1000 random inputs
8. **Bisect harness** — `git bisect run`
9. **Differential loop** — old version vs new version on the same input
10. **Human script** — last resort: use a script to guide a person through the steps

With the right feedback loop, the bug is 90% solved.

### Optimizing the loop

Once you have a loop, ask yourself:
- Can it be faster? (caching, narrower scope)
- Is the signal clearer? (assert the precise symptom)
- Is it more deterministic? (freeze time, seed the RNG)

A flaky 30-second loop is useless. A deterministic 2-second loop is a debugging superpower.

### Non-deterministic bugs

The goal is a **higher reproduction rate**, not a clean reproduction. Run it 100 times, parallelize, add load, narrow the time window.

### When you truly cannot build a loop

Stop. List what you tried. Ask the user for: the runtime environment, captured artifacts (HAR/logs/dumps), or permission to add temporary production instrumentation. **Do not enter the hypothesis phase without a loop.**

## Phase 2 — Reproduce

Confirm:

- [ ] The bug the loop reproduces is **the one the user described**, not another one that happens to be nearby
- [ ] It reproduces across multiple runs (or a non-deterministic bug has a high enough reproduction rate)
- [ ] The precise symptom has been captured

## Phase 3 — Hypothesize

First list **3-5 ranked hypotheses**; don't just test the first idea.

Each hypothesis must be **falsifiable**: state the prediction clearly.

> Format: "If <X> is the cause, then <changing Y> will make the bug disappear / <changing Z> will make it worse."

**Show the user the ranked list before you start testing.** They often have domain knowledge that instantly reorders the priorities.

## Phase 4 — Probe

Each probe corresponds to one prediction from phase 3. **Change only one variable at a time.**

Tooling preference:
1. **Debugger/REPL** — one breakpoint beats ten logs
2. **Targeted logging** — log at the boundary that distinguishes the hypotheses
3. Forbidden: "log everything then grep"

**Give every debug log line a unique prefix**, e.g. `[DEBUG-a4f2]`, with one-command cleanup at the end.

**Performance problems**: logs are usually useless. Build a baseline measurement first, then bisect.

## Phase 5 — Fix + regression test

**Write the regression test before the fix** — but only if there is a **correct seam**.

A correct seam: the test can faithfully simulate the bug pattern triggered by the caller.

If there is no correct seam, that is itself a finding.

## Phase 6 — Clean up + retrospective

Before delivering, confirm:

- [ ] The original scenario no longer reproduces
- [ ] The regression test passes (or note that there is no correct seam)
- [ ] All debug markers have been removed
- [ ] One-off prototypes have been cleaned up
- [ ] The commit message states the correct hypothesis

**Then ask: what would have prevented this bug?** If it is an architectural issue, tell the user.
