import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import DecodeTokenService from '@modules/users/services/DecodeTokenService';

export default async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    throw new AppError('Token não encontrado', 401);
  }
  const [, token] = authHeader.split(' ');

  const decodeTokenService = container.resolve(DecodeTokenService);
  const payload = await decodeTokenService.execute(token);
  console.log(payload);
  request.user = {
    id: payload.user_id,
    is_admin: payload.is_admin,
  };
  return next();
}
