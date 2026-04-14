import { z } from 'zod';

export const createCommentSchema = z.object({
  taskId: z.string(),
  content: z.string().min(1, 'Comment cannot be empty').max(3000),
});

export const updateCommentSchema = z.object({
  content: z.string().min(1).max(3000),
});

export const createAttachmentSchema = z.object({
  taskId: z.string(),
  fileName: z.string().min(1).max(255),
  fileUrl: z.string().url(),
  fileSize: z.number().int().positive(),
  mimeType: z.string(),
});

export type CreateCommentInput = z.infer<typeof createCommentSchema>;
export type UpdateCommentInput = z.infer<typeof updateCommentSchema>;
export type CreateAttachmentInput = z.infer<typeof createAttachmentSchema>;
