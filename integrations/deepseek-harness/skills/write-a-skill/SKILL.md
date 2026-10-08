---
name: write-a-skill
description: Create a new AI skill with a standard structure and progressive disclosure of information. Triggers when the user says "write a skill", "create a skill", or "new skill". 创建新的 AI skill，有标准结构和渐进式信息呈现。用户说"写个 skill"、"创建 skill"、"新建技能"时触发。
---

# Write a Skill

## Process

1. **Gather requirements** — ask the user:
   - What task/domain does this skill cover?
   - Which concrete scenarios does it handle?
   - Does it need scripts, or only instructions?
   - What reference material does it need?

2. **Draft the skill** — create:
   - A concise SKILL.md with the instructions
   - Split into reference files if the content exceeds 500 lines
   - Scripts for deterministic operations

3. **Review** — show the user:
   - Does it cover the usage scenarios?
   - What is missing?
   - Should examples be added?

## Skill structure

```
skill-name/
├── SKILL.md           # main instructions (required)
├── REFERENCE.md       # detailed documentation (optional)
├── EXAMPLES.md        # usage examples (optional)
└── scripts/           # tool scripts (optional)
    └── helper.js
```

## Description requirements

The description is the only basis on which the AI decides which skill to load.

**Goal**: give the AI enough information to judge:
1. What capability this skill provides
2. When it triggers (keywords, context, file types)

**Format**:
- At most 1024 characters
- First sentence: what it does
- Second sentence: "Triggers when the user says XXX"

## When to add scripts

- The operation is deterministic (validation, formatting)
- The same code keeps being generated repeatedly
- Errors need explicit handling

Scripts cost fewer tokens and are more reliable than generated code.

## When to split files

- SKILL.md exceeds 100 lines
- The content has clear sub-domains
- Advanced features are rarely used

## Checklist

- [ ] description contains the trigger conditions
- [ ] SKILL.md is within 100 lines
- [ ] No time-sensitive information
- [ ] Terminology is consistent
- [ ] There are concrete examples
- [ ] References are no more than one level deep
