import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICategoriesRepository from '../../repositories/ICategoriesRepository';
import ICreateUpdateCategory from '../../dtos/ICreateUpdateCategoryDTO';
import Category from '../../infra/typeorm/entities/Category';

@injectable()
export default class CreateCategoryService {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  public async execute({
    name,
  }: Omit<ICreateUpdateCategory, 'id'>): Promise<Category> {
    const existsCategory = await this.categoriesRepository.findByName(name);
    if (existsCategory) {
      throw new AppError('Já existe uma categoria com esse nome');
    }
    const category = await this.categoriesRepository.create({
      name,
    });
    return category;
  }
}
