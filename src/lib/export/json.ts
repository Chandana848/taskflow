export function generateProjectJson(project: { id: string; name: string; key: string; tasks: any[] }): string {
  const exportPayload = {
    exportedAt: new Date().toISOString(),
    version: '1.0.0',
    project: {
      id: project.id,
      name: project.name,
      key: project.key,
      taskCount: project.tasks.length,
      tasks: project.tasks
    }
  };
  return JSON.stringify(exportPayload, null, 2);
}
