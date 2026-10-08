---
name: w-ocean-agent
description: Maintain the health of the project's w-ocean knowledge graph — dedup/merge, association suggestions, edge detection, health reports. Triggers when the user says "maintain the graph", "tidy up w-ocean", "graph health", "dedup", or "association suggestions". 维护项目 w-ocean 知识图谱的健康运行：去重合并、关联建议、边缘检测、健康报告。用户说"维护图谱"、"整理 w-ocean"、"图谱健康"、"去重"、"关联建议"时触发。
---

# w-ocean-agent — knowledge graph maintenance

> Periodically maintain the current project's `w-ocean/` knowledge graph, ensuring a healthy structure, no redundant nodes, and sensible edge associations.

:```ascii

                               w-ocean-agent Pipeline
                                    ──── 5-step maintenance flow ────

  ┌────────────┐   ┌────────────┐   ┌────────────┐   ┌────────────┐   ┌──────────────┐
  │ ① Detect   │   │ ② Scan     │   │ ③ Analyze  │   │ ④ Operate  │   │ ⑤ Report     │
  │ project    │──→│ graph      │──→│ redundancy │──→│ run        │──→│ output the   │
  │ state      │   │ integrity  │   │ & chances  │   │ maintenance│   │ results      │
  └────────────┘   └────────────┘   └────────────┘   └────────────┘   └──────────────┘
       │                │                │                │                │
       │ w-ocean/ there?│ JSON validation│ duplicate nodes│ dedup + merge  │ stats on changes
       │ graph.json     │ node/edge count│ orphan nodes   │ confirm edges  │ health score
       │ config.yaml    │ refs integrity │ missing links  │ mark orphans   │ improvements
       └─ file perms.   └─ edge integrity└─ type anomaly  └─ config sync  └─
:```

## Operation modes

| Mode | Command | Description |
|------|------|------|
| **health** | `/w-ocean-agent health` | Graph health check + score |
| **maintain** | `/w-ocean-agent maintain` | Full maintenance (dedup + merge + association suggestions) |
| **dedup** | `/w-ocean-agent dedup` | Dedup only |
| **suggest** | `/w-ocean-agent suggest` | Association suggestions only |
| **prune** | `/w-ocean-agent prune` | Clean up orphan nodes |

## Execution steps

### ① Detect project state

- Check whether `w-ocean/graph.json` exists in the current project root
- Does not exist → tell the user "the w-ocean graph does not exist; run grow-dream to summarize a conversation first."
- Exists → read it and validate the JSON format

### ② Scan graph integrity (field validation rules are in the table below)

| Check | Description |
|--------|------|
| JSON format | Is `graph.json` valid JSON? |
| Required node fields | Does every node have id/type/title? |
| Edge reference integrity | Do the edges' from/to point at existing node IDs? |
| refs reference integrity | Do the IDs in refs point at existing nodes? |
| Type validity | Is the node type among the types declared in the config? |
| Edge type validity | Is the edge type among the types declared in the config? |

### ③ Analyze redundancy and opportunities

| Analysis | Criterion | Handling |
|--------|------|------|
| Duplicate nodes | title or summary similarity >80% | Merge into 1 node, keeping the earlier created |
| Orphan nodes | in-edges + out-edges = 0 | Mark as orphan; deletion optional |
| Missing reverse edge | A→B exists but B→A does not, and the type is symmetric | Suggest adding the reverse edge |
| Same-type clustering | More than 5 nodes of the same type with no association among them | Suggest adding relates-to edges |
| Referenced but unlinked | refs references a node but there is no edge association | Suggest automatically creating a relates-to edge |

### ④ Run maintenance

Depending on the operation mode and the analysis results:

- **health**: report only, no changes
- **maintain**: run everything automatically (dedup + merge + build edges + mark orphans)
- **dedup**: run dedup and merge only
- **suggest**: list the suggested edges and ask one by one whether to add them
- **prune**: list the orphan nodes and ask whether to delete them

### ⑤ Output the results

```yaml
health_score: 85/100
problems: 3
changes:
  - merged 2 duplicate nodes (skill-xxx, skill-yyy → skill-xxx)
  - added 4 association edges (relates-to)
  - marked 1 orphan node (memory-old-pattern)
suggestions:
  - consider deleting the orphan node memory-old-pattern
  - concept-ddd and skill-domain-modeling should be linked
config:
  - config.yaml declares 2 unused node types (concept, decision)
```

## Output checks

- [ ] Checked that w-ocean/ exists
- [ ] JSON format validation passed
- [ ] Node/edge integrity scan completed
- [ ] Dedup and merge executed (maintain/dedup modes)
- [ ] The user confirmed the suggested edges (suggest mode)
- [ ] graph.json written with the updates
