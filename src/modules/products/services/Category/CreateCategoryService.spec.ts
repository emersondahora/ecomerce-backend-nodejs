import AppError from '@shared/errors/AppError';
import CreateCategoryService from './CreateCategoryService';
import FakeCategoriesRepository from '../../repositories/fakes/FakeCategoriesRepository';

let createCategorySevice: CreateCategoryService;
let fakeCategoriesRepository: FakeCategoriesRepository;

describe('CreateCategory', () => {
  beforeEach(() => {
    fakeCategoriesRepository = new FakeCategoriesRepository();
    createCategorySevice = new CreateCategoryService(fakeCategoriesRepository);
  });
  it('should be able to create a category', async () => {
    const category = await createCategorySevice.execute({
      name: 'Category name',
    });
    expect(category).toHaveProperty('id');
  });
  it('should not be able to create two categories with the same name', async () => {
    const name = 'Category name';
    await createCategorySevice.execute({ name });

    await expect(createCategorySevice.execute({ name })).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
