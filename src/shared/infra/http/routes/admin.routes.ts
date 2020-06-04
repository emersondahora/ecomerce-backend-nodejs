import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import adminPrivilegesRequired from '@modules/users/infra/http/middlewares/adminPrivilegesRequired';
import adminProductsRoutes from '@modules/products/infra/http/routes/admin.products.routes';

const routes = Router();

routes.use(ensureAuthenticated);
routes.use(adminPrivilegesRequired);

routes.use('/products', adminProductsRoutes);

export default routes;
