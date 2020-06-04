import TokenSignPayloadDTO from '../dtos/TokenSignPayloadDTO';
import TokenSignOptionsDTO from '../dtos/TokenSignOptionsDTO';
import ITokenProvider from '../models/ITokenProvider';

export default class FakeTokenProvider implements ITokenProvider {
  public async sign(
    payload: TokenSignPayloadDTO,
    secret: string,
    options: TokenSignOptionsDTO,
  ): Promise<string> {
    const token = `${JSON.stringify(payload)}.${secret}.${JSON.stringify(
      options,
    )}`;
    return token;
  }

  public async decode(
    secret: string,
    token: string,
  ): Promise<TokenSignPayloadDTO> {
    const [jsonPayload, tokenSecret] = token.split('.');
    if (tokenSecret !== secret) {
      throw new Error();
    }
    const payload = JSON.parse(jsonPayload) as TokenSignPayloadDTO;

    return payload;
  }
}
