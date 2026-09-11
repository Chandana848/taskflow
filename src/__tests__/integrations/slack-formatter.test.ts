import { formatSlackMessage } from '@/lib/integrations/slack-formatter';

describe('Slack Webhook Formatter', () => {
  it('builds block kit formatted message', () => {
    const msg = formatSlackMessage('TASK_CREATED', 'New Task', 'Created by Alice', 'https://example.com');
    expect(msg.blocks).toHaveLength(3);
    expect(msg.blocks[0].type).toBe('header');
  });
});
