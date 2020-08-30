import AppError from '@shared/errors/AppError';
import Product from '@modules/products/infra/typeorm/entities/Product';
import DeleteProductService from './DeleteProductService';
import FakeProductsRepository from '../../repositories/fakes/FakeProductsRepository';

let deleteProductService: DeleteProductService;
let fakeProductsRepository: FakeProductsRepository;

const productData = Object.assign(new Product(), {
  name: 'product',
  description: 'description',
  price: 250,
});

describe('ShowProduct', () => {
  beforeEach(async () => {
    fakeProductsRepository = new FakeProductsRepository();
    deleteProductService = new DeleteProductService(fakeProductsRepository);
  });
  it('should be able to delete an especific product', async () => {
    const newProduct = await fakeProductsRepository.create(productData);
    await expect(
      deleteProductService.execute(newProduct.id),
    ).resolves.not.toThrow();
  });
  it('should not be able to get a deleted product', async () => {
    const newProduct = await fakeProductsRepository.create(productData);
    await deleteProductService.execute(newProduct.id);
    expect(await fakeProductsRepository.findById(newProduct.id)).toBe(
      undefined,
    );
  });
  it('should be able to create a new product with the same name that the deleted one', async () => {
    const newProduct = await fakeProductsRepository.create(productData);
    await deleteProductService.execute(newProduct.id);
    const newNewProduct = await fakeProductsRepository.create(productData);

    expect(newNewProduct).toHaveProperty('id');
  });
  it('showd not be able to delete a non-existing product', async () => {
    await expect(
      deleteProductService.execute('non-existing'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
