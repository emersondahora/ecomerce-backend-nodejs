import AppError from '@shared/errors/AppError';
import ShowCategoryService from './ShowCategoryService';
import FakeCategoriesRepository from '../../repositories/fakes/FakeCategoriesRepository';

let showCategoryService: ShowCategoryService;
let fakeCategoriesRepository: FakeCategoriesRepository;

describe('ShowCategory', () => {
  beforeEach(() => {
    fakeCategoriesRepository = new FakeCategoriesRepository();
    showCategoryService = new ShowCategoryService(fakeCategoriesRepository);
  });
  it('should be able show an especific category', async () => {
    const categoryData = { name: 'category' };
    const newCategory = await fakeCategoriesRepository.create(categoryData);
    const category = await showCategoryService.execute(newCategory.id);

    expect(category).toHaveProperty('id');
    expect(category).toHaveProperty('name');
  });
  it('should not be able to show an non existing category', async () => {
    await expect(
      showCategoryService.execute('non existin category'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
