import { validationResult } from 'express-validator';
import type { RequestHandler } from 'express';

export const checkValidation: RequestHandler = (req, res, next) => {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    return res
      .status(400)
      .json({
        msg: 'Field validation error',
        error: result.array(),
      });
  }

  next();
};
