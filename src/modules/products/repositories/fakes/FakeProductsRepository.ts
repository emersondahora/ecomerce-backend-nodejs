import { uuid } from 'uuidv4';

import IProductsRepository from '../IProductsRepository';
import Product from '../../infra/typeorm/entities/Product';
import ICreateUpdateProductDTO from '../../dtos/ICreateUpdateProductDTO';

export default class FakeProductsRepository implements IProductsRepository {
  private products: Product[] = [];

  public async findById(id: string): Promise<Product | undefined> {
    const product = this.products.find(finder => finder.id === id);
    return product;
  }

  public async findByName(name: string): Promise<Product | undefined> {
    const product = this.products.find(
      finder => finder.name.toLocaleLowerCase() === name.toLocaleLowerCase(),
    );
    return product;
  }

  public async create(
    data: Omit<ICreateUpdateProductDTO, 'id'>,
  ): Promise<Product> {
    const product = new Product();

    Object.assign(product, { id: uuid() }, data);
    this.products.push(product);

    return product;
  }

  public async save(data: Product): Promise<Product> {
    const product = this.products.find(finder => finder.id === data.id);
    if (!product) {
      throw Error();
    }
    Object.assign(product, data);
    return product;
  }

  public async listAll(): Promise<Product[]> {
    return this.products;
  }
}
