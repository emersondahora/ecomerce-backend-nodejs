import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import authConfig from '@config/auth';

import AppError from '@shared/errors/AppError';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import ITokenProvider from '../providers/TokenProvider/models/ITokenProvider';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

@injectable()
export default class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('TokenProvider')
    private tokenProvider: ITokenProvider,
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new AppError('User/Password not found');
    }
    const verifyPassword = await this.hashProvider.compareHash(
      password,
      user.password,
    );
    if (!verifyPassword) {
      throw new AppError('User/Password not found');
    }

    const { secret, expiresIn } = authConfig.jwt;
    const payload = {
      is_admin: user.is_admin,
      user_id: user.id,
    };
    const options = {
      expiresIn,
      subject: user.id,
    };
    const token = await this.tokenProvider.sign(payload, secret, options);

    return { user, token };
  }
}
