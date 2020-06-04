import { getRepository, Repository } from 'typeorm';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICreateUpdateProductDTO from '@modules/products/dtos/ICreateUpdateProductDTO';
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
  }: Omit<ICreateUpdateProductDTO, 'id'>): Promise<Product> {
    const product = this.ormRepository.create({
      name,
      description,
      price,
    });

    await this.ormRepository.save(product);

    return product;
  }

  public async save({
    id,
    name,
    description,
    price,
  }: ICreateUpdateProductDTO): Promise<Product> {
    const product = this.ormRepository.create({
      name,
      description,
      price,
    });

    await this.ormRepository.save(product);

    return product;
  }

  public async listAll(): Promise<Product[]> {
    const products = await this.ormRepository.find();

    return products;
  }
}
