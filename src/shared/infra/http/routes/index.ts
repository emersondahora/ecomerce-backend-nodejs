import { Router } from 'express';

import userRoutes from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';

const routes = Router();

routes.get('/', (req, res) => {
  return res.json({ message: 'Welcome to my ecomerce' });
});

routes.use('/users', userRoutes);
routes.use('/sessions', sessionsRouter);

export default routes;
