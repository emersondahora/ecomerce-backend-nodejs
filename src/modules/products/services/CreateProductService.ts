import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IProductsRepository from '../repositories/IProductsRepository';
import ICreateUpdateProductDTO from '../dtos/ICreateUpdateProductDTO';
import Product from '../infra/typeorm/entities/Product';

@injectable()
export default class CreateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute({
    name,
    description,
    price,
  }: Omit<ICreateUpdateProductDTO, 'id'>): Promise<Product> {
    const existsProduct = await this.productsRepository.findByName(name);
    if (existsProduct) {
      throw new AppError('Already have a product with this name');
    }

    const product = await this.productsRepository.create({
      name,
      description,
      price,
    });

    return product;
  }
}
