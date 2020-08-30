import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IProductsRepository from '../../repositories/IProductsRepository';
import ICategoriesRepository from '../../repositories/ICategoriesRepository';
import ICreateUpdateProductDTO from '../../dtos/ICreateUpdateProductDTO';
import Product from '../../infra/typeorm/entities/Product';

@injectable()
export default class UpdateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  public async execute({
    id,
    name,
    description,
    price,
    categories_id,
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
    if (categories_id) {
      const categories = categories_id.map(async category_id => {
        const category = await this.categoriesRepository.findById(category_id);
        if (!category) {
          throw new AppError('Categoria não encontrada.');
        }
        return category;
      });
      product.categories = await Promise.all(categories);
    }
    const updatedProduct = this.productsRepository.save(product);

    return updatedProduct;
  }
}
