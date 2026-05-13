import type { NextFunction, Request, Response } from "express";
import type { AnyZodObject } from "zod";

export function validateRequest(schema: AnyZodObject) {
  return (request: Request, _response: Response, next: NextFunction): void => {
    // Validation happens before controllers so application services receive trusted input shapes.
    const result = schema.safeParse({
      body: request.body,
      query: request.query,
      params: request.params
    });

    if (!result.success) {
      next(result.error);
      return;
    }

    request.body = result.data.body ?? request.body;
    request.query = result.data.query ?? request.query;
    request.params = result.data.params ?? request.params;
    next();
  };
}
