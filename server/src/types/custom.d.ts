import { Request } from 'express';
import { AnyZodObject } from 'zod';


declare module 'express' {
export interface Request {
// Allow Zod-validated parsed values to be attached when validate() runs
validatedBody?: any;
validatedParams?: any;
validatedQuery?: any;
}
}


export type ZodSchema = AnyZodObject;