import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import ICategoriesRepository from '../../repositories/ICategoriesRepository';
import Category from '../../infra/typeorm/entities/Category';

@injectable()
export default class ListCategoriesService {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  public async execute(): Promise<Category[]> {
    const categories = await this.categoriesRepository.listAll();

    return categories;
  }
}
