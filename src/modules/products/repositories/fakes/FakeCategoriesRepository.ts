import { uuid } from 'uuidv4';

import ICategoriesRepository from '../ICategoriesRepository';
import ICreateUpdateCategoryDTO from '../../dtos/ICreateUpdateCategoryDTO';
import Category from '../../infra/typeorm/entities/Category';
import status_type from '../../infra/typeorm/types/status';

export default class FakeCategoriesRepository implements ICategoriesRepository {
  private categories: Category[] = [];

  public async findById(id: string): Promise<Category | undefined> {
    const category = this.categories.find(
      finder => finder.id === id && finder.status !== status_type.deleted,
    );
    return category;
  }

  public async findByName(name: string): Promise<Category | undefined> {
    const category = this.categories.find(
      finder =>
        finder.name.toLocaleLowerCase() === name.toLocaleLowerCase() &&
        finder.status !== status_type.deleted,
    );
    return category;
  }

  public async create(
    data: Omit<ICreateUpdateCategoryDTO, 'id'>,
  ): Promise<Category> {
    const category = new Category();

    Object.assign(category, { id: uuid(), status: status_type.active }, data);
    this.categories.push(category);

    return category;
  }

  public async save(data: Category): Promise<Category> {
    const category = this.categories.find(finder => finder.id === data.id);
    if (!category) {
      throw Error();
    }
    Object.assign(category, data);
    return category;
  }

  public async listAll(): Promise<Category[]> {
    return this.categories.filter(
      finder => finder.status !== status_type.deleted,
    );
  }

  public async delete(id: string): Promise<void> {
    const category = await this.findById(id);
    if (category) {
      category.status = status_type.deleted;
      await this.save(category);
    }
  }
}
