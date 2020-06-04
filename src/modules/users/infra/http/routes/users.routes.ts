import { Router } from 'express';
// import multer from 'multer';
import { celebrate, Segments, Joi } from 'celebrate';

// import uploadConfig from '@config/upload';

// import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import UsersController from '../controllers/UsersController';
// import UserAvatarController from '../controllers/UserAvatarController';

const usersRouter = Router();
// const upload = multer(uploadConfig.multer);
const usersController = new UsersController();

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      password_confirmation: Joi.string().required().valid(Joi.ref('password')),
      is_admin: Joi.boolean().required(),
    },
  }),
  usersController.create,
);

export default usersRouter;
