import AppError from '@shared/errors/AppError';
import AuthenticateUserService from './AuthenticateUserService';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeTokenProvider from '../providers/TokenProvider/fakes/FakeTokenProvider';

let authenticateUserService: AuthenticateUserService;
let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let fakeTokenProvider: FakeTokenProvider;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeTokenProvider = new FakeTokenProvider();

    authenticateUserService = new AuthenticateUserService(
      fakeUserRepository,
      fakeHashProvider,
      fakeTokenProvider,
    );
  });
  it('should be able to create a session', async () => {
    const tokenSign = jest.spyOn(fakeTokenProvider, 'sign');
    const user = await fakeUserRepository.create({
      email: 'email',
      name: 'name',
      is_admin: false,
      password: await fakeHashProvider.generateHash('password'),
    });
    const response = await authenticateUserService.execute({
      email: user.email,
      password: 'password',
    });
    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
    expect(tokenSign).toHaveBeenCalled();
  });
  it('should not be able to authenticate with non existing user', async () => {
    await expect(
      authenticateUserService.execute({
        email: 'user.email',
        password: 'user.password,',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to authenticate with wrong password', async () => {
    const user = await fakeUserRepository.create({
      email: 'email',
      name: 'name',
      is_admin: false,
      password: 'password',
    });
    await expect(
      authenticateUserService.execute({
        email: user.email,
        password: 'wrong password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
