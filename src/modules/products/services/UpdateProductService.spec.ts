import AppError from '@shared/errors/AppError';
import UpdateProductService from './UpdateProductService';
import FakeProductsRepository from '../repositories/fakes/FakeProductsRepository';
import { products_status } from '../infra/typeorm/entities/Product';

let updateProductService: UpdateProductService;
let fakeProductsRepository: FakeProductsRepository;

describe('UpdateProduct', () => {
  beforeEach(() => {
    fakeProductsRepository = new FakeProductsRepository();
    updateProductService = new UpdateProductService(fakeProductsRepository);
  });
  it('should be able to update a product', async () => {
    const productData = {
      name: 'product',
      description: 'description',
      price: 250,
    };
    const newProduct = await fakeProductsRepository.create(productData);

    const updateProductData = {
      id: newProduct.id,
      name: 'product updated',
      description: 'description updated',
      price: 500,
      status: products_status.active,
    };

    const updatedProduct = await updateProductService.execute(
      updateProductData,
    );

    expect(updatedProduct).toEqual(updateProductData);
  });
  it('should not be able to update the name of a product with the same name then another one', async () => {
    const productData = {
      name: 'product',
      description: 'description',
      price: 250,
    };
    await fakeProductsRepository.create(productData);

    productData.name = 'Another Product';
    const newProduct = await fakeProductsRepository.create(productData);

    const updateProductData = {
      id: newProduct.id,
      name: 'product',
      description: 'description updated',
      price: 500,
    };

    await expect(
      updateProductService.execute(updateProductData),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to update a non existing product', async () => {
    const updateProductData = {
      id: 'non existing product',
      name: 'product updated',
      description: 'description updated',
      price: 500,
    };
    await expect(
      updateProductService.execute(updateProductData),
    ).rejects.toBeInstanceOf(AppError);
  });
});
