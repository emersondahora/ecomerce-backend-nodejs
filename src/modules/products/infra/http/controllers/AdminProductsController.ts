import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateProductService from '@modules/products/services/CreateProductService';

export default class AdminProductsControler {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, description, price } = request.body;
    const createProduct = container.resolve(CreateProductService);
    const product = await createProduct.execute({ name, description, price });
    return response.status(201).json(classToClass(product));
  }
}
