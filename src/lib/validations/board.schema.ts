import { z } from 'zod';

export const createBoardSchema = z.object({
  name: z.string().min(1).max(50),
  description: z.string().max(200).optional(),
});

export const createColumnSchema = z.object({
  name: z.string().min(1).max(40),
  position: z.number().int().min(0).default(0),
  color: z.string().regex(/^#[0-9a-fA-F]{6}$/).default('#94a3b8'),
  wipLimit: z.number().int().positive().optional(),
});

export const reorderColumnSchema = z.object({
  columnId: z.string(),
  newPosition: z.number().int().min(0),
});

export type CreateBoardInput = z.infer<typeof createBoardSchema>;
export type CreateColumnInput = z.infer<typeof createColumnSchema>;
export type ReorderColumnInput = z.infer<typeof reorderColumnSchema>;
