import { getRepository, Repository } from 'typeorm';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICreateProductDTO from '@modules/products/dtos/ICreateProductDTO';
import Product from '../entities/Product';

export default class ProductsRepository implements IProductsRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  public async findByName(name: string): Promise<Product | undefined> {
    const product = this.ormRepository.findOne({ where: { name } });
    return product;
  }

  public async create({
    name,
    description,
    price,
  }: ICreateProductDTO): Promise<Product> {
    const product = this.ormRepository.create({
      name,
      description,
      price,
    });

    await this.ormRepository.save(product);

    return product;
  }
}
