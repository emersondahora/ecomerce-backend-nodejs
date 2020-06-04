import { uuid } from 'uuidv4';

import IProductsRepository from '../IProductsRepository';
import Product from '../../infra/typeorm/entities/Product';
import ICreateProductDTO from '../../dtos/ICreateProductDTO';

export default class FakeProductsRepository implements IProductsRepository {
  private products: Product[] = [];

  public async findByName(name: string): Promise<Product | undefined> {
    const product = this.products.find(finder => finder.name === name);
    return product;
  }

  public async create(data: ICreateProductDTO): Promise<Product> {
    const product = new Product();

    Object.assign(product, { id: uuid() }, data);
    this.products.push(product);

    return product;
  }
}
