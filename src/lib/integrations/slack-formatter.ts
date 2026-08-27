export function formatSlackMessage(event: string, title: string, details: string, url?: string) {
  return {
    blocks: [
      {
        type: 'header',
        text: {
          type: 'plain_text',
          text: `TaskFlow Event: ${event}`
        }
      },
      {
        type: 'section',
        fields: [
          { type: 'mrkdwn', text: `*Title:*\n${title}` },
          { type: 'mrkdwn', text: `*Details:*\n${details}` }
        ]
      },
      ...(url ? [{
        type: 'actions',
        elements: [
          {
            type: 'button',
            text: { type: 'plain_text', text: 'View in TaskFlow' },
            url
          }
        ]
      }] : [])
    ]
  };
}
