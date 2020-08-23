import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICategoriesRepository from '../../repositories/ICategoriesRepository';
import ICreateUpdateCategoryDTO from '../../dtos/ICreateUpdateCategoryDTO';
import Category from '../../infra/typeorm/entities/Category';

@injectable()
export default class UpdateCategoryService {
  constructor(
    @inject('CategoriesRepository')
    private CategorysRepository: ICategoriesRepository,
  ) {}

  public async execute({
    id,
    name,
  }: ICreateUpdateCategoryDTO): Promise<Category> {
    const existsCategory = await this.CategorysRepository.findByName(name);
    if (existsCategory && existsCategory.id !== id) {
      throw new AppError('Already have a Category with this name');
    }

    const category = await this.CategorysRepository.findById(id);
    if (!category) {
      throw new AppError('Categoria não encontrado');
    }
    Object.assign(category, { name });

    const updatedCategory = this.CategorysRepository.save(category);

    return updatedCategory;
  }
}
