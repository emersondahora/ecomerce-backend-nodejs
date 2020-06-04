import { Router } from 'express';

import userRoutes from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import adminRoutes from './admin.routes';

const routes = Router();

routes.get('/', (req, res) => {
  return res.json({ message: 'Welcome to my ecomerce' });
});

routes.use('/admin', adminRoutes);

routes.use('/users', userRoutes);
routes.use('/sessions', sessionsRouter);

export default routes;
