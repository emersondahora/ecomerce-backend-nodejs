import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IProductsRepository from '../repositories/IProductsRepository';
import ICreateUpdateProductDTO from '../dtos/ICreateUpdateProductDTO';
import Product from '../infra/typeorm/entities/Product';

@injectable()
export default class UpdateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute({
    id,
    name,
    description,
    price,
  }: ICreateUpdateProductDTO): Promise<Product> {
    const existsProduct = await this.productsRepository.findByName(name);
    if (existsProduct && existsProduct.id !== id) {
      throw new AppError('Already have a product with this name');
    }

    const product = await this.productsRepository.findById(id);
    if (!product) {
      throw new AppError('Produto não encontrado');
    }
    Object.assign(product, { name, description, price });

    const updatedProduct = this.productsRepository.save(product);

    return updatedProduct;
  }
}
