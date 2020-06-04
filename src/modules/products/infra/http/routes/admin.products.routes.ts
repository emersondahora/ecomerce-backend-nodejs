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
    },
  }),
  adminProductsController.create,
);

export default adminProductsRoutes;
