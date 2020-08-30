import { getRepository, Repository, Not } from 'typeorm';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import Product, { products_status } from '../entities/Product';

export default class ProductsRepository implements IProductsRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  public async findById(id: string): Promise<Product | undefined> {
    const product = this.ormRepository.findOne(id, {
      where: { status: Not(products_status.deleted) },
      relations: ['categories'],
    });
    return product;
  }

  public async findByName(name: string): Promise<Product | undefined> {
    const product = this.ormRepository.findOne({
      where: { name, status: Not(products_status.deleted) },
    });
    return product;
  }

  public async create({
    name,
    description,
    price,
    categories,
  }: Omit<Product, 'id'>): Promise<Product> {
    const product = this.ormRepository.create({
      name,
      description,
      price,
      categories,
    });

    await this.ormRepository.save(product);

    return product;
  }

  public async save(product: Product): Promise<Product> {
    return this.ormRepository.save(product);
  }

  public async listAll(): Promise<Product[]> {
    const products = await this.ormRepository.find({
      where: { status: Not(products_status.deleted) },
      relations: ['categories'],
    });

    return products;
  }

  public async delete(id: string): Promise<void> {
    const product = await this.findById(id);
    if (product) {
      product.status = products_status.deleted;
      this.save(product);
    }
  }
}
