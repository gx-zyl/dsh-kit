# w-ocean — the knowledge ocean

Your project's knowledge graph. Generated and maintained automatically by `grow-dream`.

## What this is

After each `grow-dream` run that summarizes a conversation, the reusable patterns discovered (skill/rule/command/agent/hook/memory/doc) are formatted as **nodes**, the associations between nodes are recorded as **edges**, and together they form a directed-graph knowledge graph.

## How to use it

```bash
# browse the whole graph
/w-ocean show

# filter by type
/w-ocean show type=skill

# search keywords
/w-ocean query "database"

# traverse from a node (2 levels deep)
/w-ocean traverse from=skill-diagnose depth=2

# graph health check
/w-ocean-agent health
```

## Directory structure

```
w-ocean/
├── graph.json      # graph data (nodes + edges)
├── config.yaml     # configuration (node/edge types, dedup rules)
└── README.md       # this file
```

## Node ID rules

```
{type}-{kebab-case-title}
```

Example: `skill-grill-dream`, `skill-diagnose`, `memory-user-preference`

## Best practices

1. **Run grow-dream regularly** — run it after every important conversation to sediment new findings
2. **Keep the graph healthy** — run `w-ocean-agent maintain` monthly to deduplicate/merge
3. **Link existing nodes** — reference existing nodes through `refs` when summarizing with grow-dream
4. **Extend node types** — edit `config.yaml` to add new types

## Data safety

`graph.json` should be committed to version control (team-shared knowledge).
`node_modules/`, `.git/` and the like are excluded by default.
