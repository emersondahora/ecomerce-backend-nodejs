import TokenSignPayloadDTO from '../dtos/TokenSignPayloadDTO';
import TokenSignOptionsDTO from '../dtos/TokenSignOptionsDTO';

export default interface ITokenProvider {
  sign(
    payload: TokenSignPayloadDTO,
    secret: string,
    options: TokenSignOptionsDTO,
  ): Promise<string>;
  decode(secret: string, token: string): Promise<TokenSignPayloadDTO>;
}
