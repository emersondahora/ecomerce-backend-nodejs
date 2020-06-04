import AppError from '@shared/errors/AppError';
import CreateProductService from './CreateProductService';
import FakeProductsRepository from '../repositories/fakes/FakeProductsRepository';

let createProductService: CreateProductService;
let fakeProductsRepository: FakeProductsRepository;

describe('CreateProduct', () => {
  beforeEach(() => {
    fakeProductsRepository = new FakeProductsRepository();
    createProductService = new CreateProductService(fakeProductsRepository);
  });
  it('should be able to create a product', async () => {
    const product = await createProductService.execute({
      name: 'product',
      description: 'description',
      price: 250,
    });
    expect(product).toHaveProperty('id');
  });
  it('should not be able to create two products with the same name', async () => {
    await createProductService.execute({
      name: 'product',
      description: 'description',
      price: 250,
    });
    await expect(
      createProductService.execute({
        name: 'product',
        description: 'description',
        price: 250,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
