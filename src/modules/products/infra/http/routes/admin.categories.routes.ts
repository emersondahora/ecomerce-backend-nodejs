import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import AdminCategoriesController from '../controllers/AdminCategoriesController';

const adminCategoriesRoutes = Router();
const adminCategoriesController = new AdminCategoriesController();

adminCategoriesRoutes.get('/', adminCategoriesController.index);
adminCategoriesRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
  }),
  adminCategoriesController.create,
);

adminCategoriesRoutes.get(
  '/:category_id',
  celebrate({
    [Segments.PARAMS]: {
      category_id: Joi.string().uuid().required(),
    },
  }),
  adminCategoriesController.show,
);

adminCategoriesRoutes.put(
  '/:category_id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
    [Segments.PARAMS]: {
      category_id: Joi.string().uuid().required(),
    },
  }),
  adminCategoriesController.update,
);

adminCategoriesRoutes.delete(
  '/:category_id',
  celebrate({
    [Segments.PARAMS]: {
      category_id: Joi.string().uuid().required(),
    },
  }),
  adminCategoriesController.delete,
);

export default adminCategoriesRoutes;
