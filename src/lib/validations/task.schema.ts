import { z } from 'zod';

export const priorityEnum = z.enum(['URGENT', 'HIGH', 'MEDIUM', 'LOW', 'NONE']);

export const createTaskSchema = z.object({
  title: z.string().trim().min(1, 'Task title is required').max(200),
  description: z.string().trim().max(5000).optional(),
  columnId: z.string(),
  projectId: z.string(),
  priority: priorityEnum.default('MEDIUM'),
  dueDate: z.string().datetime().optional(),
  estimate: z.number().int().min(0).max(1000).optional(),
  assigneeId: z.string().optional(),
});

export const updateTaskSchema = createTaskSchema.partial().extend({
  position: z.number().int().min(0).optional(),
  isArchived: z.boolean().optional(),
});

export const moveTaskSchema = z.object({
  taskId: z.string(),
  targetColumnId: z.string(),
  newPosition: z.number().int().min(0),
});

export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;
export type MoveTaskInput = z.infer<typeof moveTaskSchema>;
