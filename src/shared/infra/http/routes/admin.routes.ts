import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import adminProductsRoutes from '@modules/products/infra/http/routes/admin.products.routes';

const routes = Router();

routes.use(ensureAuthenticated);

routes.use('/products', adminProductsRoutes);

export default routes;
