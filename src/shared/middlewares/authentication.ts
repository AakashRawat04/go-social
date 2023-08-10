import { NextFunction, Request, Response } from 'express';
import LoggerInstance from '@/loaders/logger';
import { ERRORS } from '../errors';
import { db } from '@/loaders/database';

export default function authenticateToken() {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers['authorization'];
      const token = authHeader?.split(' ')[1];

      if (!token) {
        LoggerInstance.error('Token Not Found');
        throw { statusCode: 401, message: 'Token Not Found' };
      }

      const authResp = await (await db()).auth.getUser(token);

      if (authResp.error) {
        throw {
          statusCode: 404,
          message: authResp.error,
        };
      }

      next();
    } catch (error) {
      LoggerInstance.error(error);
      res
        .status(error.statusCode ?? ERRORS.SERVER_ERROR.code)
        .json({ success: false, message: error.message ?? ERRORS.SERVER_ERROR.message });
    }
  };
}
