import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import AdminProductsController from '../controllers/AdminProductsController';

const adminProductsRoutes = Router();
const adminProductsController = new AdminProductsController();

adminProductsRoutes.get('/', adminProductsController.index);
adminProductsRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      description: Joi.string().required(),
      price: Joi.number().required(),
      categories_id: Joi.array().items(Joi.string()),
    },
  }),
  adminProductsController.create,
);

adminProductsRoutes.get(
  '/:product_id',
  celebrate({
    [Segments.PARAMS]: {
      product_id: Joi.string().uuid().required(),
    },
  }),
  adminProductsController.show,
);
adminProductsRoutes.put(
  '/:product_id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      description: Joi.string().required(),
      price: Joi.number().required(),
      categories_id: Joi.array().items(Joi.string()),
    },
    [Segments.PARAMS]: {
      product_id: Joi.string().uuid().required(),
    },
  }),
  adminProductsController.update,
);

adminProductsRoutes.delete(
  '/:product_id',
  celebrate({
    [Segments.PARAMS]: {
      product_id: Joi.string().uuid().required(),
    },
  }),
  adminProductsController.delete,
);
export default adminProductsRoutes;
