import AppError from '@shared/errors/AppError';
import Product from '@modules/products/infra/typeorm/entities/Product';
import ShowProductService from './ShowProductService';
import FakeProductsRepository from '../../repositories/fakes/FakeProductsRepository';

let showProductService: ShowProductService;
let fakeProductsRepository: FakeProductsRepository;

describe('ShowProduct', () => {
  beforeEach(() => {
    fakeProductsRepository = new FakeProductsRepository();
    showProductService = new ShowProductService(fakeProductsRepository);
  });
  it('should be able show an especific product', async () => {
    const productData = Object.assign(new Product(), {
      name: 'product',
      description: 'description',
      price: 250,
    });
    const newProduct = await fakeProductsRepository.create(productData);

    const product = await showProductService.execute(newProduct.id);

    expect(product).toHaveProperty('id');
    expect(product).toHaveProperty('name');
  });
  it('should not be able to show an non existing product', async () => {
    await expect(
      showProductService.execute('non existin product'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
