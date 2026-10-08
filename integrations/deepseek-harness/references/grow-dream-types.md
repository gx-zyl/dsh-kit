# grow-dream candidate type definitions

The type system shared by grow-dream step 4 (distill and classify) and step 8 (interrogation validation).

## Type table

| Type | Essence | Decision criteria | DSH output path |
|------|---------|-------------------|-----------------|
| **skill** | A scenario-specific solution recipe | Has branch judgment, needs context understanding, reusable in a specific scenario | Project-level `<project>/.dsh/skills/<name>/`; user-level `$DSH_HOME/skills/<name>/` (with `SKILL.md`) |
| **command** | A deterministic operation sequence | Fixed steps ≤7, repeated ≥2 times, no branch judgment | Same as skill (DSH has no separate command mechanism; deterministic flows are also produced as skills) |
| **rule** | A cross-project generic behavioral constraint | Does not reference concrete paths/commands, describes a generic constraint | Cross-project → `$DSH_HOME/AGENTS.md`; in-project → `<project>/AGENTS.md` |
| **agent** | A limited role that runs continuously | Has independent decision autonomy, clear role boundary | `$DSH_HOME/.agent-presets/<name>/` (`preset.yml` + `agent.cordis.yml`) |
| **hook** | Event-driven automation | Pure background, executes in ≤3s, failure does not affect the main flow | `hooks.json` (read by the profile's hook-bridging bundle; only command hooks take effect) |
| **memory** | Cross-session persistent memory | Frequency ≥2, cross-session generic, does not duplicate an existing entry | `memory/<name>.md` + the `MEMORY.md` index |
| **doc** | Documentation valid only for the current project | Non-generic, `docs/`-related only | As needed |

## Usage

- **Step 4 (distill and classify)**: decide which type a pattern belongs to based on the conversation, then apply that type's classification rules
- **Step 8 (interrogation validation)**: interrogate one by one using the validation dimensions and decision criteria of the corresponding type

> To add a new type, add one row here; the grow-dream main flow does not need to change.
