import AppError from '@shared/errors/AppError';
import UpdateCategoryService from './UpdateCategoryService';
import FakeCategoriesRepository from '../../repositories/fakes/FakeCategoriesRepository';
import status_type from '../../infra/typeorm/types/status';

let updateCategoryService: UpdateCategoryService;
let fakeCategoriesRepository: FakeCategoriesRepository;

describe('UpdateCategory', () => {
  beforeEach(() => {
    fakeCategoriesRepository = new FakeCategoriesRepository();
    updateCategoryService = new UpdateCategoryService(fakeCategoriesRepository);
  });
  it('should be able to update a category', async () => {
    const categoryData = {
      name: 'category',
    };
    const newCategory = await fakeCategoriesRepository.create(categoryData);

    const updateCategoryData = {
      id: newCategory.id,
      name: 'category updated',
      status: status_type.active,
    };

    const updatedCategory = await updateCategoryService.execute(
      updateCategoryData,
    );

    expect(updatedCategory).toEqual(updateCategoryData);
  });
  it('should not be able to update the name of a category with the same name then another one', async () => {
    const categoryData = {
      name: 'category',
      description: 'description',
      price: 250,
    };
    await fakeCategoriesRepository.create(categoryData);

    categoryData.name = 'Another category';
    const newCategory = await fakeCategoriesRepository.create(categoryData);

    const updateCategoryData = {
      id: newCategory.id,
      name: 'category',
    };

    await expect(
      updateCategoryService.execute(updateCategoryData),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to update a non existing category', async () => {
    const updatecategoryData = {
      id: 'non existing category',
      name: 'category updated',
      description: 'description updated',
      price: 500,
    };
    await expect(
      updateCategoryService.execute(updatecategoryData),
    ).rejects.toBeInstanceOf(AppError);
  });
});
