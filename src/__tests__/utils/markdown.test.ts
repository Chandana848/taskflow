import { renderMarkdown } from '@/lib/markdown';

describe('Markdown Renderer', () => {
  it('renders bold and italic tags safely', () => {
    const input = '**Bold** and *Italic*';
    const html = renderMarkdown(input);
    expect(html).toContain('<strong>Bold</strong>');
    expect(html).toContain('<em>Italic</em>');
  });

  it('neutralizes script injections in markdown', () => {
    const attack = '<script>bad()</script>';
    const html = renderMarkdown(attack);
    expect(html).not.toContain('<script>');
  });
});
