import { Request, Response } from 'express';

export const notFoundMiddleware = (req: Request, res: Response) => {
  return res.status(404).json({
    status: 404,
    error: 'Not found'
  });
};
