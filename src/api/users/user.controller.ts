import { db } from '@/loaders/database';
import { NextFunction, Request, Response } from 'express';

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { data, error } = await (await db()).from('profiles').select('*');

    if (error) {
      throw {
        statusCode: 400,
        message: error.message,
      };
    }

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};
