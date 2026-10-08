---
name: w-ocean
description: Browse/query/traverse the project knowledge graph (w-ocean/). 浏览/查询/遍历项目知识图谱（w-ocean/）
---

# /w-ocean — knowledge graph interaction command

Operates on the `w-ocean/` knowledge graph under the current project.

## Usage

| Usage | Description |
|------|------|
| `/w-ocean` | Browse the graph overview (default mode) |
| `/w-ocean show` | Show all nodes + a Mermaid diagram |
| `/w-ocean show type=skill` | Filter by type |
| `/w-ocean query <keyword>` | Search nodes |
| `/w-ocean traverse from=<node ID> depth=<levels>` | BFS graph traversal |

## Execution logic

1. **Detect w-ocean**: check whether `w-ocean/graph.json` exists in the current project root
   - Does not exist → tell the user "w-ocean has not been generated yet; run grow-dream to summarize a conversation first"
   - Exists → read the graph data

2. **Dispatch the subcommand**:

   ### show (default)
   Read `w-ocean/graph.json` and output:
   - Node/edge statistics
   - A list grouped by type
   - Mermaid diagram visualization
   - Key associations

   ### query
   Search the keyword in the nodes' id/title/summary/tags and return the matches and their associated edges.

   ### traverse
   BFS traversal starting from the given node, outputting the path tree and a Mermaid diagram, marking circular dependencies.

3. **User guidance**: after finishing, recommend the next step (e.g. "try `/w-ocean query database` to see related nodes")

## Notes

- This command operates on **the current project's** `w-ocean/`, not the dsh-kit skill package template
- If `w-ocean/graph.json` is corrupt (invalid JSON), suggest the repair command
- `graph.json` should be committed to version control

## Dependencies

| Resource | Purpose |
|------|------|
| `w-ocean/graph.json` | Graph data |
