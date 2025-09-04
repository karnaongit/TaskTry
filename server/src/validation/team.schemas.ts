import { z } from 'zod';


export const objectIdSchema = z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid ObjectId');


export const createTeamSchema = z.object({
name: z.string().min(2).max(100),
email: z.string().email().max(200),
designation: z.string().min(2).max(100),
});


export const updateTeamRequestSchema = z.object({
params: z.object({ id: objectIdSchema }),
body: z
.object({
name: z.string().min(2).max(100).optional(),
email: z.string().email().max(200).optional(),
designation: z.string().min(2).max(100).optional(),
})
.refine((data) => Object.keys(data).length > 0, { message: 'At least one field must be provided' }),
});


export const teamIdParamSchema = z.object({ id: objectIdSchema });


export const paginationQuerySchema = z.object({
page: z.coerce.number().int().min(1).default(1),
limit: z.coerce.number().int().min(1).max(100).default(10),
search: z.string().trim().optional(),
});