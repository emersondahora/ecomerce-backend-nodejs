import { getRepository, Repository, Not } from 'typeorm';

import ICategoriesRepository from '@modules/products/repositories/ICategoriesRepository';
import ICreateUpdateCategoryDTO from '@modules/products/dtos/ICreateUpdateCategoryDTO';
import Category from '../entities/Category';
import status_type from '../types/status';

export default class CategoriesRepository implements ICategoriesRepository {
  private ormRepository: Repository<Category>;

  constructor() {
    this.ormRepository = getRepository(Category);
  }

  async findById(id: string): Promise<Category | undefined> {
    const category = this.ormRepository.findOne(id, {
      where: { status: Not(status_type.deleted) },
    });
    return category;
  }

  public async findByName(name: string): Promise<Category | undefined> {
    const category = this.ormRepository.findOne({
      where: { name, status: Not(status_type.deleted) },
    });
    return category;
  }

  public async create({
    name,
  }: Omit<ICreateUpdateCategoryDTO, 'id, status'>): Promise<Category> {
    const category = this.ormRepository.create({ name });
    await this.ormRepository.save(category);
    return category;
  }

  public async save(category: Category): Promise<Category> {
    return this.ormRepository.save(category);
  }

  public async listAll(): Promise<Category[]> {
    const categories = await this.ormRepository.find({
      where: { status: Not(status_type.deleted) },
    });

    return categories;
  }

  public async delete(id: string): Promise<void> {
    const categoriy = await this.findById(id);
    if (categoriy) {
      categoriy.status = status_type.deleted;
      this.save(categoriy);
    }
  }
}
