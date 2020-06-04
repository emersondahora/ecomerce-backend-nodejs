import { sign, verify } from 'jsonwebtoken';

import TokenSignPayloadDTO from '../dtos/TokenSignPayloadDTO';
import TokenSignOptionsDTO from '../dtos/TokenSignOptionsDTO';
import ITokenProvider from '../models/ITokenProvider';

export default class JWTTokenProvider implements ITokenProvider {
  public async sign(
    payload: TokenSignPayloadDTO,
    secret: string,
    options: TokenSignOptionsDTO,
  ): Promise<string> {
    const token = sign(payload, secret, options);
    return token;
  }

  public async decode(
    secret: string,
    token: string,
  ): Promise<TokenSignPayloadDTO> {
    const response = verify(token, secret) as TokenSignPayloadDTO;
    return response;
  }
}
