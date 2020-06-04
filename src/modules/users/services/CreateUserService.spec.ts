import AppError from '@shared/errors/AppError';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let createUserService: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();
    createUserService = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );
  });
  it('should be able to create a new User', async () => {
    const user = await createUserService.execute({
      name: 'username',
      email: 'email-user',
      is_admin: false,
      password: 'password',
    });

    expect(user).toHaveProperty('id');
  });
  it('should not be stored raw password', async () => {
    const user = await createUserService.execute({
      name: 'username',
      email: 'email-user',
      is_admin: false,
      password: 'password',
    });

    expect(user.password).not.toBe('password');
  });
  it('should not be able to create more than one user with the same email', async () => {
    await createUserService.execute({
      name: 'username',
      email: 'email-user',
      is_admin: false,
      password: 'password',
    });

    await expect(
      createUserService.execute({
        name: 'username',
        email: 'email-user',
        is_admin: false,
        password: 'password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
