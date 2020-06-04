import AppError from '@shared/errors/AppError';
import authConfig from '@config/auth';

import DecodeTokenService from './DecodeTokenService';
import FakeTokenProvider from '../providers/TokenProvider/fakes/FakeTokenProvider';

let decodeTokenService: DecodeTokenService;
let fakeTokenProvider: FakeTokenProvider;

describe('DecodeTokenService', () => {
  beforeEach(() => {
    fakeTokenProvider = new FakeTokenProvider();

    decodeTokenService = new DecodeTokenService(fakeTokenProvider);
  });
  it('should be able to decode a token', async () => {
    const payload = {
      user_id: 'user_id',
      is_admin: false,
    };
    const token = await fakeTokenProvider.sign(payload, authConfig.jwt.secret, {
      subject: 'user_id',
      expiresIn: '15d',
    });
    const payloadDecoded = await decodeTokenService.execute(token);
    expect(payloadDecoded.user_id).toEqual(payload.user_id);
  });

  it('should not be able to decode a invalid token', async () => {
    await expect(
      decodeTokenService.execute('invalid token'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
