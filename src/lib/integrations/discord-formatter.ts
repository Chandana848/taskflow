export function formatDiscordEmbed(event: string, title: string, description: string, color = 0x6366F1) {
  return {
    embeds: [
      {
        title: `[${event}] ${title}`,
        description,
        color,
        footer: {
          text: 'TaskFlow Webhook Notification'
        },
        timestamp: new Date().toISOString()
      }
    ]
  };
}
