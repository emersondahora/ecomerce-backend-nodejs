import AppError from '@shared/errors/AppError';
import DeleteCategoryService from './DeleteCategoryService';
import FakeCategoriesRepository from '../../repositories/fakes/FakeCategoriesRepository';

let deleteCategoryService: DeleteCategoryService;
let fakeCategoriesRepository: FakeCategoriesRepository;

const categoryData = {
  name: 'category',
  description: 'description',
  price: 250,
};

describe('DeleteCategory', () => {
  beforeEach(async () => {
    fakeCategoriesRepository = new FakeCategoriesRepository();
    deleteCategoryService = new DeleteCategoryService(fakeCategoriesRepository);
  });
  it('should be able to delete an especific category', async () => {
    const newCategory = await fakeCategoriesRepository.create(categoryData);
    await expect(
      deleteCategoryService.execute(newCategory.id),
    ).resolves.not.toThrow();
  });
  it('should not be able to get a deleted category', async () => {
    const newCategory = await fakeCategoriesRepository.create(categoryData);
    await deleteCategoryService.execute(newCategory.id);
    expect(await fakeCategoriesRepository.findById(newCategory.id)).toBe(
      undefined,
    );
  });
  it('should be able to create a new category with the same name that the deleted one', async () => {
    const newCategory = await fakeCategoriesRepository.create(categoryData);
    await deleteCategoryService.execute(newCategory.id);
    const newNewCategory = await fakeCategoriesRepository.create(categoryData);

    expect(newNewCategory).toHaveProperty('id');
  });
  it('showd not be able to delete a non-existing product', async () => {
    await expect(
      deleteCategoryService.execute('non-existing'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
