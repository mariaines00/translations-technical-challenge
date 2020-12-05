import { RequestHandler, Request, Response, NextFunction } from 'express';

export const translate: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    res.sendStatus(200);
};
