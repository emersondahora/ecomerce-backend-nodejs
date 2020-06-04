import Product from '../infra/typeorm/entities/Product';
import ICreateUpdateProductDTO from '../dtos/ICreateUpdateProductDTO';

export default interface IProductsRepository {
  findById(id: string): Promise<Product | undefined>;
  findByName(name: string): Promise<Product | undefined>;
  create(data: Omit<ICreateUpdateProductDTO, 'id'>): Promise<Product>;
  save(data: Product): Promise<Product>;
  listAll(): Promise<Product[]>;
}
