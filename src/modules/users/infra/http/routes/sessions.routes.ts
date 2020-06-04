import { Router, Request, Response } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import SessionsController from '../controllers/SessionsController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const sessionRouter = Router();
const sessionsController = new SessionsController();

sessionRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  sessionsController.create,
);

sessionRouter.get(
  '/test-token',
  ensureAuthenticated,
  (request: Request, response: Response) => {
    response.status(204).json();
  },
);

export default sessionRouter;
