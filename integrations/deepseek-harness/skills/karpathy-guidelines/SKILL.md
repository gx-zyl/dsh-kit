---
name: karpathy-guidelines
description: Karpathy's behavioral guidelines for LLM coding, to reduce common AI programming mistakes. Triggers when the user says "do it the Karpathy way", "write it carefully", or "don't over-engineer". Karpathy LLM 编码行为指南，减少常见 AI 编程错误。用户说"按 Karpathy 来"、"谨慎点写"、"不要过度设计"时触发。
metadata:
  origin: dsh-kit
  license: MIT
---

# Karpathy Guidelines

General behavioral rules for reducing common LLM coding mistakes.

**Trade-off:** these rules favor caution over speed. For simple tasks, use your own judgment.

## 1. Think before you write

**Don't guess. Don't hide confusion. Put the trade-offs on the table.**

Before implementing:
- State your assumptions explicitly. If unsure, ask.
- If there are several reasonable interpretations, list them all — don't quietly pick one.
- If there is a simpler approach, say so. Push back when pushback is due.
- If anything is unclear, stop. Say clearly what confused you. Ask.

## 2. Simplicity first

**The minimum amount of code that solves the problem. No speculation.**

- Don't build features that weren't requested.
- Don't abstract code that is used only once.
- Don't add "flexibility" or "configurability" nobody asked for.
- Don't handle errors that cannot occur.
- If you wrote 200 lines but it could have been 50, rewrite it.

Ask yourself: "Would a senior engineer say this is over-complicated?" If yes, simplify.

## 3. Scalpel-style changes

**Touch only what must be touched. Clean up only the mess you made.**

When changing existing code:
- Don't "improve while you're there" the adjacent code, comments, or formatting.
- Don't refactor what isn't broken.
- Follow the existing style, even if you would write it differently yourself.
- If you spot unrelated dead code, just mention it — don't delete it.

If your change creates orphans:
- Delete unused imports/variables/functions caused by your change.
- Don't delete dead code that was already there — unless the user asks.

The test: every changed line should trace directly back to the user's request.

## 4. Goal-driven

**Define the success criteria. Loop until verified.**

Turn the task into a verifiable goal:
- "add validation" → "write tests for invalid input, make them pass"
- "fix a bug" → "write a reproducing test, make it green"
- "refactor X" → "tests pass both before and after the refactor"

For multi-step tasks, state a short plan first:
```
1. [step] → verify: [check]
2. [step] → verify: [check]
3. [step] → verify: [check]
```

Strong success criteria let you iterate independently. Weak criteria ("just make it work") require repeated confirmation.
