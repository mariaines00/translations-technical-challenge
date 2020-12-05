import { RequestHandler, Request, Response, NextFunction } from 'express';

export const importData: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    res.sendStatus(200);
};
