import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateProductService from '@modules/products/services/Products/CreateProductService';
import ListProductsService from '@modules/products/services/Products/ListProductsService';
import UpdateProductService from '@modules/products/services/Products/UpdateProductService';
import ShowProductService from '@modules/products/services/Products/ShowProductService';
import DeleteProductService from '@modules/products/services/Products/DeleteProductService';

export default class AdminProductsControler {
  public async index(request: Request, response: Response): Promise<Response> {
    const listProductsService = container.resolve(ListProductsService);
    const products = await listProductsService.execute();

    return response.json(products);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, description, price, categories_id } = request.body;
    const { product_id: id } = request.params;
    const updateProduct = container.resolve(UpdateProductService);
    const product = await updateProduct.execute({
      id,
      name,
      description,
      price,
      categories_id,
    });
    return response.status(201).json(classToClass(product));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, description, price, categories_id } = request.body;
    const createProduct = container.resolve(CreateProductService);
    const product = await createProduct.execute({
      name,
      description,
      price,
      categories_id,
    });
    return response.status(201).json(classToClass(product));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { product_id: id } = request.params;
    const showProduct = container.resolve(ShowProductService);
    const product = await showProduct.execute(id);
    return response.status(201).json(classToClass(product));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { product_id: id } = request.params;
    const deleteProduct = container.resolve(DeleteProductService);
    await deleteProduct.execute(id);
    return response.status(200).send();
  }
}
