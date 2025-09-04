import { AnyZodObject, ZodError } from 'zod';
import { Request, Response, NextFunction } from 'express';


// If `where` is omitted, we validate the whole request shape { params, query, body }
export function validate(
schema: AnyZodObject,
where?: 'body' | 'query' | 'params'
) {
return (req: Request, _res: Response, next: NextFunction) => {
const input = where
? (req as any)[where]
: { params: req.params, query: req.query, body: req.body };


const result = schema.safeParse(input);
if (!result.success) {
const err = new ZodError(result.error.issues);
(err as any).status = 400;
return next(err);
}


if (where) {
(req as any)[where] = result.data; // use parsed/coerced values for that section
} else {
const { params, query, body } = result.data as any;
req.params = params ?? req.params;
req.query = query ?? req.query;
req.body = body ?? req.body;
}


return next();
};
}