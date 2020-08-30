import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IProductsRepository from '../../repositories/IProductsRepository';
import ICategoriesRepository from '../../repositories/ICategoriesRepository';
import ICreateUpdateProductDTO from '../../dtos/ICreateUpdateProductDTO';
import Product from '../../infra/typeorm/entities/Product';
import Category from '../../infra/typeorm/entities/Category';

@injectable()
export default class CreateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  public async execute({
    name,
    description,
    price,
    categories_id,
  }: Omit<ICreateUpdateProductDTO, 'id'>): Promise<Product> {
    const existsProduct = await this.productsRepository.findByName(name);
    if (existsProduct) {
      throw new AppError('Já existe um produto com esse nome');
    }

    let categories: Category[] = [];
    if (categories_id) {
      const categories_promises = categories_id.map(async category_id => {
        const category = await this.categoriesRepository.findById(category_id);
        if (!category) {
          throw new AppError('Categoria não encontrada.');
        }
        return category;
      });
      categories = await Promise.all(categories_promises);
    }
    const productData = new Product();
    Object.assign(productData, {
      name,
      description,
      price,
      categories,
    });
    const product = await this.productsRepository.create(productData);

    return product;
  }
}
