import Category from '../infra/typeorm/entities/Category';
import ICreateUpdateCategoryDTO from '../dtos/ICreateUpdateCategoryDTO';

export default interface IProductsRepository {
  findById(id: string): Promise<Category | undefined>;
  findByName(name: string): Promise<Category | undefined>;
  create(data: Omit<ICreateUpdateCategoryDTO, 'id'>): Promise<Category>;
  save(data: Category): Promise<Category>;
  listAll(): Promise<Category[]>;
  delete(id: string): Promise<void>;
}
