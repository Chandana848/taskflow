# Realtime Event Payload Schemas

Events emitted on the channel:
- `task.created`: { taskId, projectId, title, assigneeId }
- `task.updated`: { taskId, changes, actorId }
- `task.moved`: { taskId, sourceColumnId, targetColumnId, position }
- `comment.created`: { commentId, taskId, authorId, content }
