import Product from '../infra/typeorm/entities/Product';
import ICreateProductDTO from '../dtos/ICreateProductDTO';

export default interface IProductsRepository {
  findByName(name: string): Promise<Product | undefined>;
  create(data: ICreateProductDTO): Promise<Product>;
  listAll(): Promise<Product[]>;
}
