import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';

const validate = (schema: ZodSchema, source: 'body' | 'query' | 'params') => {
  return async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    try {
      req[source] = await schema.parseAsync(req[source]);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        console.log('--- ZOD ERROR DETAILS ---');
        console.log(JSON.stringify(error.errors, null, 2));
      }
      next(error);
    }
  };
};

export const validateBody = (schema: ZodSchema) => validate(schema, 'body');
export const validateQuery = (schema: ZodSchema) => validate(schema, 'query');
export const validateParams = (schema: ZodSchema) => validate(schema, 'params');