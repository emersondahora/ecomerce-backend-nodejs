import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import authConfig from '@config/auth';

import AppError from '@shared/errors/AppError';
import ITokenProvider from '../providers/TokenProvider/models/ITokenProvider';
import TokenSignPayloadDTO from '../providers/TokenProvider/dtos/TokenSignPayloadDTO';

interface IRequest {
  token: string;
}

@injectable()
export default class AuthenticateUserService {
  constructor(
    @inject('TokenProvider')
    private tokenProvider: ITokenProvider,
  ) {}

  public async execute(token: string): Promise<TokenSignPayloadDTO> {
    const { secret } = authConfig.jwt;
    try {
      return await this.tokenProvider.decode(secret, token);
    } catch {
      throw new AppError('Invalid Token', 401);
    }
  }
}
