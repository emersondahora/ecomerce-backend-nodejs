import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateCategoryService from '@modules/products/services/Category/CreateCategoryService';
import ShowCategoryService from '@modules/products/services/Category/ShowCategoryService';
import UpdateCategoryService from '@modules/products/services/Category/UpdateCategoryService';
import DeleteCategoryService from '@modules/products/services/Category/DeleteCategoryService';
import ListCategoriesService from '@modules/products/services/Category/ListCategoriesService';

export default class AdminCategoriesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listCategoriesService = container.resolve(ListCategoriesService);
    const categories = await listCategoriesService.execute();

    return response.json(categories);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const createCategory = container.resolve(CreateCategoryService);
    const category = await createCategory.execute({ name });
    return response.status(201).json(classToClass(category));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { category_id: id } = request.params;
    const showCategory = container.resolve(ShowCategoryService);
    const category = await showCategory.execute(id);
    return response.status(201).json(classToClass(category));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;
    const { category_id: id } = request.params;
    const updateCategory = container.resolve(UpdateCategoryService);
    const category = await updateCategory.execute({
      id,
      name,
    });
    return response.status(201).json(classToClass(category));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { category_id: id } = request.params;
    const deleteCategory = container.resolve(DeleteCategoryService);
    await deleteCategory.execute(id);
    return response.status(200).send();
  }
}
