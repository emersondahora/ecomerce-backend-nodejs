import Product from '../infra/typeorm/entities/Product';

export default interface IProductsRepository {
  findById(id: string): Promise<Product | undefined>;
  findByName(name: string): Promise<Product | undefined>;
  create(data: Omit<Product, 'id'>): Promise<Product>;
  save(data: Product): Promise<Product>;
  listAll(): Promise<Product[]>;
  delete(id: string): Promise<void>;
}
