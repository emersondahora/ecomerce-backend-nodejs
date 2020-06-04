import { Request, Response, NextFunction } from 'express';

import AppError from '@shared/errors/AppError';

export default async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  if (!request.user.is_admin) {
    throw new AppError('Acess Denied!', 401);
  }

  return next();
}
