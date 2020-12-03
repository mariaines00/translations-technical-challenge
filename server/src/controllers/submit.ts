import { RequestHandler, Request, Response, NextFunction } from 'express';

export const submitFile: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    //TODO: utils - validations on file struct and language
    res.sendStatus(200);
};
