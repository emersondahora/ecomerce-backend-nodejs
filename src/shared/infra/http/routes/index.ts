import { Router } from 'express';

import userRoutes from '@modules/users/infra/http/routes/users.routes';

const routes = Router();

routes.get('/', (req, res) => {
  return res.json({ message: 'Welcome to my ecomerce' });
});

routes.use('/users', userRoutes);

export default routes;
