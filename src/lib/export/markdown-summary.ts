export function generateMarkdownSummary(projectName: string, tasks: Array<{ title: string; status: string; priority: string }>): string {
  let md = `# Project Summary: ${projectName}\n\n`;
  md += `Generated on: ${new Date().toLocaleDateString('en-US')}\n\n`;
  md += `| Task Title | Status | Priority |\n|---|---|---|\n`;
  for (const t of tasks) {
    md += `| ${t.title} | ${t.status} | ${t.priority} |\n`;
  }
  return md;
}
