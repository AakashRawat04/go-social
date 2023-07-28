import { Request, Response } from 'express';

export const getReels = (req: Request, res: Response) => {
  res.json({
    name: 'Hello form reels',
  });
};
