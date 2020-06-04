import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import AdminProductsController from '../controllers/AdminProductsController';

const adminProductsRoutes = Router();
const adminProductsController = new AdminProductsController();

adminProductsRoutes.post('/', adminProductsController.create);

export default adminProductsRoutes;
