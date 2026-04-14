import { z } from 'zod';

export const createProjectSchema = z.object({
  name: z.string().min(2).max(60),
  key: z.string().min(2).max(10).toUpperCase().regex(/^[A-Z0-9]+$/, 'Project key must be uppercase letters/numbers'),
  description: z.string().max(500).optional(),
  color: z.string().regex(/^#[0-9a-fA-F]{6}$/, 'Color must be a valid hex code').default('#3b82f6'),
  leadId: z.string().cuid().optional(),
});

export const updateProjectSchema = createProjectSchema.partial();

export type CreateProjectInput = z.infer<typeof createProjectSchema>;
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;
