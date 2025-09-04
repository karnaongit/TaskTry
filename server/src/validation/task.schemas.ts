import { z } from 'zod';
import { objectIdSchema, paginationQuerySchema } from './team.schemas';


export const createTaskSchema = z.object({
title: z.string().min(2).max(200),
description: z.string().min(2).max(1000),
deadline: z.coerce.date(),
project: objectIdSchema,
assignedMembers: z.array(objectIdSchema).default([]),
status: z.enum(['to-do', 'in-progress', 'done', 'cancelled']).default('to-do'),
});


export const updateTaskRequestSchema = z.object({
params: z.object({ id: objectIdSchema }),
body: z
.object({
title: z.string().min(2).max(200).optional(),
description: z.string().min(2).max(1000).optional(),
deadline: z.coerce.date().optional(),
project: objectIdSchema.optional(),
assignedMembers: z.array(objectIdSchema).optional(),
status: z.enum(['to-do', 'in-progress', 'done', 'cancelled']).optional(),
})
.refine((data) => Object.keys(data).length > 0, { message: 'At least one field must be provided' }),
});


export const taskIdParamSchema = z.object({ id: objectIdSchema });


export const taskFilterQuerySchema = paginationQuerySchema.extend({
project: objectIdSchema.optional(),
member: objectIdSchema.optional(),
status: z.enum(['to-do', 'in-progress', 'done', 'cancelled']).optional(),
search: z.string().trim().optional(),
startDate: z.coerce.date().optional(),
endDate: z.coerce.date().optional(),
});