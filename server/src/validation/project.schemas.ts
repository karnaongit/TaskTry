import { z } from 'zod';
import { objectIdSchema, paginationQuerySchema } from './team.schemas';


export const createProjectSchema = z.object({
name: z.string().min(2).max(100),
description: z.string().min(2).max(500),
teamMembers: z.array(objectIdSchema).default([]),
});


export const updateProjectRequestSchema = z.object({
params: z.object({ id: objectIdSchema }),
body: z
.object({
name: z.string().min(2).max(100).optional(),
description: z.string().min(2).max(500).optional(),
teamMembers: z.array(objectIdSchema).optional(),
})
.refine((data) => Object.keys(data).length > 0, { message: 'At least one field must be provided' }),
});


export const projectIdParamSchema = z.object({ id: objectIdSchema });


export { paginationQuerySchema };