import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';


// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction) {
// Zod validation errors
if (err instanceof ZodError) {
return res.status((err as any).status || 400).json({
success: false,
error: 'ValidationError',
details: err.flatten(),
});
}


// Mongo duplicate key
if (err && err.code === 11000) {
return res.status(409).json({
success: false,
error: 'DuplicateKeyError',
details: err.keyValue,
message: 'Duplicate value for unique field',
});
}


// CastError for invalid ObjectId
if (err?.name === 'CastError' && err?.path === '_id') {
return res.status(400).json({ success: false, error: 'InvalidId', message: 'Invalid resource id' });
}


const status = err.status || 500;
return res.status(status).json({
success: false,
error: err.name || 'ServerError',
message: err.message || 'Something went wrong',
});
}