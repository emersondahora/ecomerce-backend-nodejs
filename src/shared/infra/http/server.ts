import 'reflect-metadata';
import 'dotenv/config';
import 'express-async-errors';

import '@shared/infra/typeorm';
import '@shared/container';

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { errors } from 'celebrate';

import AppError from '@shared/errors/AppError';
import rateLimiter from './midldlewares/rateLimiter';
import routes from './routes';

const app = express();

app.use(rateLimiter);
app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errors());
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }
  console.log(err);
  return response
    .status(500)
    .json({ status: 'error', message: 'Internal server error' });
});
app.listen(3333, () => console.log('🚀🚀 server started on 3333'));
