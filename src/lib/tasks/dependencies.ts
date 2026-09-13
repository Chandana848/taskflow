export interface DependencyEdge {
  taskId: string;
  dependsOnId: string;
}

export function hasCircularDependency(edges: DependencyEdge[], newTask: string, newDependency: string): boolean {
  if (newTask === newDependency) return true;

  const adj = new Map<string, string[]>();
  for (const edge of edges) {
    if (!adj.has(edge.taskId)) adj.set(edge.taskId, []);
    adj.get(edge.taskId)!.push(edge.dependsOnId);
  }

  // add hypothetical edge
  if (!adj.has(newTask)) adj.set(newTask, []);
  adj.get(newTask)!.push(newDependency);

  const visited = new Set<string>();
  const inStack = new Set<string>();

  function dfs(curr: string): boolean {
    visited.add(curr);
    inStack.add(curr);

    const neighbors = adj.get(curr) || [];
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        if (dfs(neighbor)) return true;
      } else if (inStack.has(neighbor)) {
        return true;
      }
    }

    inStack.delete(curr);
    return false;
  }

  for (const node of adj.keys()) {
    if (!visited.has(node)) {
      if (dfs(node)) return true;
    }
  }

  return false;
}
