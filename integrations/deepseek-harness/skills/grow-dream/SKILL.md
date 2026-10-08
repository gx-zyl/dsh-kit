---
name: grow-dream
description: Review the current conversation, distill improvements that can be sedimented as a skill / rule / agent / memory, validate candidates through structured interrogation, and write the accepted ones into the knowledge graph (w-ocean). Triggers when the user says "improve", "sediment", "distill rules", "dream", "summarize the conversation", or "solidify the pattern". 回顾本次对话，提炼可沉淀为 skill / rule / agent / memory 的改进，用结构化追问验收候选，并把采纳项写入知识图谱 (w-ocean)。用户说"改进"、"沉淀"、"提炼规则"、"造梦"、"总结对话"、"固化模式"时触发。
---

# grow-dream — conversation review and capability growth

Review the current conversation, identify patterns worth sedimenting, and output improvement suggestions.

```ascii

                                    grow-dream Pipeline
                                         ──── 9-step flow ────

  ┌────────────┐   ┌────────────┐   ┌────────────┐   ┌────────────┐   ┌────────────┐   ┌────────────┐   ┌────────────┐   ┌──────────────┐   ┌──────────────┐
  │    ①      │   │    ②      │   │    ③      │   │    ④      │   │    ⑤      │   │    ⑥      │   │    ⑦      │   │     ⑧       │   │     ⑨       │
  │  Pick      │──→│  Scan      │──→│  Check     │──→│  Cross-    │──→│  Classify  │──→│  Structured│──→│  Optional  │──→│  Interrogate │──→│  Sediment    │
  │  inputs    │   │  patterns  │   │  project   │   │  check     │   │  & distill │   │  output    │   │  execution │   │  validation  │   │  into graph  │
  └────────────┘   └────────────┘   └────────────┘   └────────────┘   └────────────┘   └────────────┘   └────────────┘   └──────────────┘   └──────────────┘
       │                 │                │                 │                │                 │               │               │               │
       │ dialogue log    │ repeated ops   │ AGENTS.md       │ terminology    │ skill (scenario)│ graded advice │ write by tpl  │ frequency?    │ format nodes  │
       │ session log     │ explicit fixes │ AGENTS.md       │ user fixes     │ command (fixed) │ options       │ format check  │ covered?      │ find edges    │
       │ git log         │ implicit       │ rules/          │ AI feedback    │ rule (generic)  │               │ write memory  │ trigger clear?│ call workflow │
       │ memory/         │ frequency      │ agents/         │ user fixes     │ agent/hook/doc  │               │               │ upkeep cost?  │ confirm graph │
       └─ edit history   └─ frequency     └─                └─ review       └─ memory (rule) └─              └─              └─              └─
```

```ascii

                                grow-dream Link Diagram
                                    inputs ←→ analyzer ←→ outputs

              ┌─────────────────────────────────────────────────────────────────────────────────────┐
              │                        Project knowledge system (analyzed / produced)               │
              │                                                                                     │
              │  ┌─────────────────┐  ┌─────────────────┐  ┌──────────────────────────┐             │
              │  │  skill defs      │  │  rule constraints│  │  memory persistence      │             │
              │  │ .dsh/skills/     │  │ AGENTS.md       │  │  projects/*/memory/      │             │
              │  └────────┬────────┘  └────────┬────────┘  └───────────┬──────────────┘             │
              │           │                    │                      │                            │
              │           └──────┬─────────────┴───────────┬──────────┘                            │
              │                  │                         │                                       │
              │          ┌───────▼───────────┐    ┌────────▼──────────┐     ┌─────────────────┐    │
              │          │  hook automation  │    │  AGENTS.md        │     │  knowledge graph │    │
              │          │  hooks.json       │    │  (project/global) │     │  directed graph  │    │
              │          └───────────────────┘    └───────────────────┘     │  w-ocean/        │    │
              └─────────────────────────────────────────────────────────────└───────────────────┘──┘
                                                                                       ▲
                                                                                       │ ⑨ append
                                                                                       │
  ┌────────────┐    ┌──────────────┐    ┌──────────────┬──────────────────────┐        │
  │  Inputs     │    │  Analysis    │    │               │                       │        │
  │            │    │  engine      │    │        ┌──────▼──────┐               │        │
  │ dialogue ──┼───→│  grow-dream  │────┼───────→│  Improvement │               │        │
  │ log        │    │  review +    │    │        │  suggestions │               │        │
  │ git log    │    │  distill     │    │        │ ① skill add  │──────────────┼────────┘
  │ edit hist. │    │ ② check      │    │        │ ② command add│──────────────┼────────┐
  │ memory/    │    │  w-ocean     │    │        │ ③ rule boost │──────────────┼────────┤
  │ w-ocean/ ──┼───→│  existing    │    │        │ ④ agent new  │──────────────┼────────┤
  │            │    │  nodes       │    │        │ ⑤ hook auto  │──────────────┼────────┤
  │            │    │              │    │        │ ⑥ memory     │──────────────┼────────┤
  │            │    │  (feedback   │    │        │ ⑦ doc fix    │──────────────┼────────┤
  └────────────┘    │   loop)      │    │        └──────┬──────┘               │        │
                    └──────┬───────┘    │               │                      │        │
                           │            │        ┌──────▼──────────┐           │        │
                           │ ⑧ internal │        │  Interrogation   │          │        │
                           │ validation │───────→│  accept/drop/add │          │        │
                           └────────────┘        └─────────────────┘          │        │
                                        └──────────────────────────────────────        │
                                                                                       │
                                                       ⑨ graph sedimentation ──────────┘
                                                          each summary appended as a node
                                                          ─────── feedback loop ───────
                                                          next grow-dream step ②
                                                          checks w-ocean existing nodes first
                                                          avoids duplicates + senses the graph
                                                          ─────────────────────────────
                                                                    │
                                                                    │ feedback
                                                                    ▼
                                                          ┌─────────────────┐
                                                          │  Inputs (next)   │
                                                          │  w-ocean/ added  │
                                                          └─────────────────┘
```

```ascii

                        grow-dream Matrix Flow
                identify → judge → produce, 3 stages × 7 dimensions, with per-node constraints

                ┌────────────────────────────────────────────────────────────────────────────────────────────────────┐
                │                        ① Identify the pattern (does an improvement signal appear?)              │
                ├──────────┬──────────┬──────────┬──────────┬──────────┬──────────┬──────────┬──────────┤
                │  Dim.    │  skill   │  cmd     │  rule    │  agent   │  hook    │  doc     │  memory  │
                ├──────────┼──────────┼──────────┼──────────┼──────────┼──────────┼──────────┼──────────┤
                │  Signal  │ dialogue │ repeat   │ user     │ indep.   │ git/     │ path/    │ freq ≥2  │
                │  detect  │ shows a  │ ≥2 fixed │ explicit │ decisions│ DSH      │ command  │ pattern  │
                │          │ gap      │ ops      │ fixes    │ scenario │ event    │ ≠ actual │ reminder │
                │          │          │          │          │ repeats  │ trigger  │          │ pref.    │
                ├──────────┼──────────┼──────────┼──────────┼──────────┼──────────┼──────────┼──────────┤
                │                        ② Compare and judge (is it already covered by an existing file?)         │
                ├──────────┬──────────┬──────────┬──────────┬──────────┬──────────┬──────────┬──────────┤
                │  Compare │ .dsh/    │ .dsh/    │ AGENTS   │ .agent-  │ hooks.   │ project  │ project  │
                │  target  │ skills/  │ skills/  │ .md      │ presets/ │ json     │ root     │ memory/  │
                │          │ <name>   │ <name>   │ <name>   │ <name>   │ <name>   │ files    │ MEMORY.md│
                ├──────────┼──────────┼──────────┼──────────┼──────────┼──────────┼──────────┼──────────┤
                │                        ③ Classify and produce (condition → target path)                        │
                ├──────────┬──────────┬──────────┬──────────┬──────────┬──────────┬──────────┬──────────┤
                │  Output  │ scenario │ determi- │ cross-   │ limited  │ automa-  │ supplement│ persis- │
                │  type    │ recipe   │ nistic   │ project  │ role     │ tion     │ / fix    │ tent     │
                │  judge   │ has      │ fixed    │ generic, │ needs    │ no inter-│ current  │ memory   │
                │          │ branches │ ≤7 steps │ no path  │ judgment │ action   │ project  │ entry    │
                │          │          │          │          │          │ backend  │ only     │ cross-   │
                │          │          │          │          │          │          │          │ session  │
                └──────────┴──────────┴──────────┴──────────┴──────────┴──────────┴──────────┴──────────┘

                Constraint notes:
                ┌──────────┬────────────────────────────────────────────────────────────────┐
                │  skill   │ trigger keywords must be explicit; the entry must carry the     │
                │          │ pipeline + link + matrix diagrams                              │
                │  command │ no branch judgment; fixed repeatable steps; must be registered  │
                │          │ in the command list after production                           │
                │  rule    │ must not reference concrete project paths/commands; describes   │
                │          │ a generic behavioral constraint                                │
                │  agent   │ after production, define how it is invoked (skill reference /   │
                │          │ workflow orchestration / manual invocation)                    │
                │  hook    │ must be assessed for execution cost ≤3s and for failures not    │
                │          │ affecting the main flow                                        │
                │  doc     │ produced only when the conversation touches docs/ maintenance   │
                │  memory  │ pattern reminders with freq ≥2 are written; cross-session       │
                │          │ reusable patterns first; check whether existing memory already  │
                │          │ covers it; update the MEMORY.md index after production          │
                └──────────┴────────────────────────────────────────────────────────────────┘
```

> Pipeline stage ⑨ ↔ execution step mapping: ①=0 ②=1 ③=2 ④=3 ⑤=4 ⑥=5-6 ⑦=7-8 ⑧=9 ⑨=10

## Review dimensions

| Dimension | What to check |
|------|---------|
| **skill** | Which skills turned out to be missing, wrong, or insufficient in the conversation? Do the trigger keywords need updating? |
| **command** | Is there a deterministic operation sequence repeated ≥2 times? Can one command replace the manual steps? Do the trigger keywords need updating? |
| **rule** | Which new rules does the conversation reveal as needed? Are existing rules wrong or in need of strengthening? |
| **agent** | Is there a repeated operation pattern that would suit a dedicated agent? Note: this means a DSH agent preset, in the form `$DSH_HOME/.agent-presets/<name>/` (`preset.yml` + `agent.cordis.yml`). After production, consider how it is invoked/orchestrated (referenced from a skill, orchestrated in a workflow, invoked manually). |
| **hook** | Is there an automated behavior that would suit a hook? Assess: **judgment conditions** (when it triggers, what state change triggers it), **timing** (git event / DSH event / scheduled), **efficiency** (execution cost, whether it blocks the main flow, impact of failure). |
| **AGENTS.md** | Does it exist? Is the content consistent with the project's actual architecture? Are there stale paths/commands/conventions? Does it duplicate or conflict with `rules/` files? Does it need environment, command, or directory conventions added? |
| **AGENTS.md / agents/** | Does it exist? Do the defined agent roles match the project's needs? Are there definitions without corresponding files? Are usage scenarios and boundaries recorded? |
| **memory** | Does the conversation contain pattern reminders with freq ≥2 or cross-session reusable user preferences? Do existing memory files already cover them? Do entries need to be created or updated? Is MEMORY.md updated in sync? |
| **[cross-check] conflicts and contradictions** | Do AGENTS.md / skill definitions / rule entries / agent presets / hook scripts / memory entries contradict each other? Is the same concept named consistently across files? Does the AI's feedback agree with what the project files record? Have behaviors the user corrected been updated in the corresponding files? |

## Execution steps

0. **Determine the input source** — choose the analysis scope:
   - This conversation (default)
   - A specified conversation log (path)
   - git log / commit messages
   - The modification history of a specific file or directory
   - **memory/** — consult existing memory files
   - **w-ocean/** — consult existing graph nodes to avoid duplicate sedimentation (if a similar node exists, prefer extending it over creating a new one)

1. Browse the conversation/input source, identifying recurring patterns, errors, or explicit corrections. At the same time compare against existing w-ocean nodes to confirm whether this is a **new pattern** or a **variant of an existing pattern**:
   - Similar node exists → extend that node (update tags/refs/edges) rather than creating a new one
   - Entirely new pattern → add the node normally

2. Scan the project's AGENTS.md, `.dsh/skills/`, `$DSH_HOME/.agent-presets/`, memory/ **and w-ocean/** files, and compare them against the actual behavior observed:
   - **AGENTS.md**: do the recorded paths/commands/conventions match actual usage? Are key conventions missing?
   - **AGENTS.md/agents/**: are the defined agents actually used? Are the agents actually used recorded?
   - **memory/**: do existing memory entries cover the pattern reminders found in the conversation? Do any entries need updating or retiring?
   - **w-ocean/graph.json**: do the existing nodes in the graph cover the patterns identified this time? Can existing edges be reused for new candidates?
   - **Project docs (as needed)**: check the STATE/DONE/WARN/HISTORY status only when the conversation touches docs/ maintenance

3. **Cross-check**: compare file pairs to see whether they describe the same concept consistently; check whether behaviors the user once corrected have been updated in the corresponding files; confirm the AI's feedback does not contradict the project files

4. **Distill and classify** — categorize by frequency and nature. Type definitions are in `../../references/grow-dream-types.md`.
   - A deterministic operation repeated ≥2 times → command
   - A solution recipe for a specific scenario (needs branch judgment) → skill (before producing it, follow the structural requirements of the `write-a-skill` skill)
   - A cross-project generic behavioral constraint → rule
   - A limited role needing independent judgment and continuous running → agent (form: `agents/<name>.md`, YAML frontmatter + Markdown body)
   - Automation triggered by a specific git/DSH event → hook
   - Project root docs missing or inconsistent → AGENTS.md
   - **Pattern reminders with freq ≥2, repeated corrections, cross-session preference persistence** → **memory**

   Graph awareness: follow the w-ocean comparison result from step ① — extend if a variant exists, create a new node if the pattern is entirely new.
5. Judge each dimension one by one: is there room for improvement?
6. Output structured suggestions: which file to improve, how to change it, and why
7. For improvements that need a user decision, offer options
8. **Optional execution**: ask the user whether to produce the improvement files directly. If confirmed, generate the corresponding files in execution mode and apply the output checks

9. **⑧ Interrogation validation** — for each improvement candidate distilled in step 5, run one interrogation validation at a time. This is a built-in sub-flow of grow-dream and needs no external skill:

   It inherits three interrogation principles — each is a core rule inherited from grill-me, ensuring the interrogation is grounded, non-empty, and non-coercive:

   > **① Validate one candidate at a time; wait for the verdict before moving to the next.**
   > No machine-gun questioning. Only after a candidate finishes validation (accepted/dropped/needs more information) do you move to the next candidate.
   >
   > **② Give your own recommended verdict first for every question.**
   > Not "what do you think?", but "my judgment is that we should accept / drop it, because…". Show that you did the work and lower the user's decision cost.
   >
   > **③ If a project file can answer it, check the file before asking.**
   > Don't ask things you can look up yourself such as "does a file already cover this skill in `.dsh/skills/`". Check the files, then ask with the evidence in hand.

   During validation, consult the existing nodes and edges related to the candidate in the w-ocean graph, and ask with graph evidence (e.g. "w-ocean already has a node of the same kind, skill-xxx; does this candidate extend it or depend on it?").

   Validation dimensions:

   Type definitions are in `../../references/grow-dream-types.md`. The validation dimensions are as follows:

   | Candidate type | Validation dimension | Decision criteria |
   |---------|---------|---------|
   | **skill** | Are trigger conditions explicit? Already covered by an existing skill? Maintenance cost? | Trigger keywords explicit, no overlap with existing skills, scenario-based with branches |
   | **command** | Fixed steps ≤7? Repeated ≥2 times? | Deterministic operation, no branch judgment |
   | **rule** | Cross-project generic? No concrete paths referenced? | Generic behavioral constraint, no conflict with existing rules |
   | **agent** | Independent judgment capability? Clear usage scenario? | Has decision autonomy, clear role boundary |
   | **hook** | Event-driven? Execution cost ≤3s? Failure does not affect the main flow? | Pure background, explicit trigger conditions |
   | **memory** | Freq ≥2? Cross-session generic? Covered by an existing entry? | Meets both thresholds, no duplication |
   | **doc** | Valid only for the current project? | Non-generic, docs/-related only |

   Output a verdict for each candidate: **recommend accept** / **recommend drop** / **needs more information**.

   Append the validation conclusions as a table at the end of the output (see the output format `## Interrogation validation`).

10. **⑨ Graph sedimentation** — sediment this summary's structured output into the current project's `w-ocean/` knowledge graph:

    a. **Detect and initialize** — check whether `w-ocean/graph.json` exists in the current project root:
       - **Exists** → skip (later steps will read it)
       - **Does not exist** → copy the initial graph from the dsh-kit skill package template:
         ```
         # locate the .dsh/skills/ directory
         DSHKIT_PATH=".dsh/skills"
         if [ ! -d "$DSHKIT_PATH/grow-dream/templates/w-ocean" ]; then
           echo "error: grow-dream template not found; confirm that .dsh/skills/ exists"
           exit 1
         fi
         WOCEAN_TPL="$DSHKIT_PATH/grow-dream/templates/w-ocean"
         ```
         Copy everything under `.dsh/skills/grow-dream/templates/w-ocean/` into the project root's `w-ocean/`:
         - `graph.json` (graph data; replace `__TEMPLATE_DATE__` with the current date)
         - `config.yaml` (configuration)
         - `README.md` (documentation)
         - `commands/w-ocean.md` (local /w-ocean command; the template is the canonical source)
         - `skills/w-ocean-agent/SKILL.md` (local maintenance skill; the template is the canonical source)
       - Output an initialization confirmation → "w-ocean graph initialized: 0 nodes, 0 edges, with local command and skill"

    b. **Format nodes** — format each accepted candidate from the improvement suggestions (skill/command/rule/agent/hook/memory/doc) as a w-ocean node:
       - `id`: `{type}-{kebab-case-title}` (e.g. `skill-grill-dream`)
       - `type`: the candidate type
       - `title`: a short name
       - `summary`: a one-sentence summary
       - `content`: the file path or feature description
       - `source`: `grow-dream-{YYYY-MM-DD}`
       - `tags`: keyword tags extracted from the conversation
       - `refs`: IDs of referenced existing nodes (e.g. which existing skill this skill extends)

    c. **Identify edge relations** — identify relations among new nodes and between new and existing nodes:
       - extends: the new skill extends an existing skill
       - depends-on: the new rule implements a constraint of some skill
       - precedes: link by creation order
       - generalizes/relates-to: same-topic association

    d. **Inline ingestion** — read and write `w-ocean/graph.json` directly:

       graph.json structure:
       ```json
       { "meta": { "name": "w-ocean", "nodeCount": 0, "edgeCount": 0, "updated": "" },
         "nodes": [{"id": "{type}-{kebab}", "type": "skill|rule|command|agent|hook|memory|doc|concept|decision",
                    "title": "", "summary": "", "content": "", "source": "", "created": "", "tags": [], "refs": []}],
         "edges": [{"from": "node-id", "to": "node-id", "type": "extends|depends-on|conflicts-with|generalizes|relates-to|precedes|triggers|refines|alternative"}] }
       ```

       - Read the current contents of `w-ocean/graph.json`
       - Deduplicate new nodes by id: on the same id update content/tags/refs and keep the original created
       - Deduplicate new edges by the (from, to, type) triple
       - Auto-create edges: for other nodes referenced by a new node's refs, automatically create relates-to edges
       - Update meta.nodeCount, meta.edgeCount, meta.updated
       - Write back `w-ocean/graph.json`

    e. **Graph update confirmation** — confirm the append result and output the number of nodes added, edges added, and a graph overview.

    f. Append the artifacts to the `## Graph sedimentation` section of the output format.

## Output format

```
## Improvement suggestions

### skill
- [skill-name]: suggestion + reason

### command
- [command-name]: suggestion + reason

### rule
- [rule-file]: suggestion + reason

### agent
- [agent-name]: suggestion + reason

### hook
- [hook-description]: suggestion + reason

### AGENTS.md
- [AGENTS.md / missing / agent preset]: suggestion + reason

### memory
- [memory/<file>.md]: pattern reminder + suggested content + whether to update MEMORY.md
- [new memory entry]: pattern description + suggested filename + related memory entries

### Cross-check: conflicts and contradictions
- [file A vs file B / AI feedback vs file / memory vs actual behavior]: the contradiction + the suggested direction for unifying it

### Project docs (as needed)
- appears only when the conversation touches docs/ maintenance
- [docs/STATE.md / DONE.md / WARN.md / HISTORY.md]: suggestion + reason

## Interrogation validation

| Candidate | Verdict | Reason |
|------|------|------|
| [name] | accept / drop / needs more | [short reason] |

## Graph sedimentation

| Metric | Value |
|------|----|
| Source | grow-dream-{YYYY-MM-DD} |
| Initialization | created / existing / skipped |
| Nodes added | [count] |
| Nodes updated | [count] |
| Edges added | [count] |
| Auto edges (refs) | [count] |
| Graph total | [total nodes] nodes / [total edges] edges |

### Nodes added

- `{node-id}` ({type}): {summary}

### Edges added

- `{from}` ─{type}→ `{to}`
```

## Execution mode (optional)

After the user confirms, produce the improvement files directly. Each improvement type has a fixed path and judgment conditions:

| Output type | Target path | Applicable condition |
|---------|---------|---------|
| **skill** | project level `<project>/.dsh/skills/<name>/`, user level `$DSH_HOME/skills/<name>/` (with `SKILL.md` + `references/` + `scripts/`) | scenario capabilities with judgment branches and a need for contextual understanding. For the structure see the `write-a-skill` skill |
| **command** | `<project>/.dsh/skills/<name>/SKILL.md` | deterministic operations with fixed steps that need no AI judgment |
| **rule** | project level `<project>/AGENTS.md`; cross-project `$DSH_HOME/AGENTS.md` | cross-project generic behavioral constraints |
| **agent** | `$DSH_HOME/.agent-presets/<name>/` (`preset.yml` + `agent.cordis.yml`) | long-running, with decision autonomy, domain-specific; DSH agent preset format |
| **hook** | `hooks.json` (read by the profile's hook bridge bundle; only command hooks take effect) | automation triggered by specific git/DSH events, with no interaction |
| **memory** | `memory/<name>.md` + update the `MEMORY.md` index | persistence of pattern reminders with freq ≥2, repeated corrections, and cross-session preferences |
| **graph node** | `w-ocean/graph.json` (inline ingestion) | invoked automatically after each grow-dream summary completes |

## Entry diagram requirement

The entry of every skill / script / class / document / other md file must carry **three ASCII diagrams** immediately after the title:

| Diagram type | Content | Purpose |
|--------|------|------|
| **Pipeline** | a horizontally staged processing flow, with arrows connecting the stages and the input/output details annotated under each stage | see the stage breakdown of the whole flow at a glance |
| **Link Diagram** | the three-layer association of input source → analysis engine → output target, showing where the file sits in the system and its upstream/downstream relations | quickly locate the file's role in the overall architecture |
| **Matrix Flow** | a matrix-style flow of the identify→judge→produce stages × seven dimensions, with constraint notes | show the judgment logic and quality gates of each dimension at each stage, guiding analysis and production decisions |

Violating this requirement counts as an incomplete output; the diagrams must be added before it is considered done.

## Output checks

Verify each item before producing files:

- [ ] Entry diagrams: the entry carries the ASCII pipeline + link + matrix diagrams
- [ ] The artifact is directly usable (paths and formats correct)
- [ ] Trial-and-error traces from the conversation are removed, leaving only the final solution
- [ ] The described trigger conditions are explicit (when the AI should activate)
- [ ] No time-sensitive information is included
- [ ] Terminology is consistent with the project's existing usage
- [ ] **memory completeness**: have pattern reminders with freq ≥2 been written to memory? Do existing memory entries need supplementing or retiring because of this round's findings? Is the MEMORY.md index updated in sync?
- [ ] **Interrogation validation**: every improvement candidate has passed interrogation validation with an explicit verdict (accept/drop/needs more)
- [ ] **skill structural compliance** (when a skill is produced): verify against the `write-a-skill` skill, confirming SKILL.md has clear responsibilities, references/ and scripts/ are separated, and the description describes trigger scenarios rather than being promotional copy
- [ ] **Graph sedimentation completeness**: have all accepted candidates been formatted as nodes and appended to the graph? Is the node ID format correct? Have edge relations been identified? Has the ingestion been executed and confirmed?
