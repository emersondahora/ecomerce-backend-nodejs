import { uuid } from 'uuidv4';

import IProductsRepository from '../IProductsRepository';
import Product, { products_status } from '../../infra/typeorm/entities/Product';
import ICreateUpdateProductDTO from '../../dtos/ICreateUpdateProductDTO';

export default class FakeProductsRepository implements IProductsRepository {
  private products: Product[] = [];

  public async findById(id: string): Promise<Product | undefined> {
    const product = this.products.find(
      finder => finder.id === id && finder.status !== products_status.deleted,
    );
    return product;
  }

  public async findByName(name: string): Promise<Product | undefined> {
    const product = this.products.find(
      finder =>
        finder.name.toLocaleLowerCase() === name.toLocaleLowerCase() &&
        finder.status !== products_status.deleted,
    );
    return product;
  }

  public async create(
    data: Omit<ICreateUpdateProductDTO, 'id'>,
  ): Promise<Product> {
    const product = new Product();

    Object.assign(
      product,
      { id: uuid(), status: products_status.active },
      data,
    );
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
    return this.products.filter(
      finder => finder.status !== products_status.deleted,
    );
  }

  public async delete(id: string): Promise<void> {
    const product = await this.findById(id);
    if (product) {
      product.status = products_status.deleted;
      await this.save(product);
    }
  }
}
