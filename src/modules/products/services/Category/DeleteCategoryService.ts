import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICategoriesRepository from '../../repositories/ICategoriesRepository';
import status_type from '../../infra/typeorm/types/status';

@injectable()
export default class Deletecategorieservice {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const category = await this.categoriesRepository.findById(id);
    if (!category) {
      throw new AppError('Produto não encontrado');
    }
    Object.assign(category, { status: status_type.deleted });

    await this.categoriesRepository.save(category);
  }
}
