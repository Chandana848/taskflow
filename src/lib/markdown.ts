import { sanitizeHtml } from './security/sanitize';

export function renderMarkdown(markdown: string): string {
  if (!markdown) return '';
  let html = sanitizeHtml(markdown);

  // Bold
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  // Italic
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
  // Inline Code
  html = html.replace(/`([^`]+)`/g, '<code class="bg-muted px-1 rounded">$1</code>');
  // Linebreaks
  html = html.replace(/\n/g, '<br />');

  return html;
}
