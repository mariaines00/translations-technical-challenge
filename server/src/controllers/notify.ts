import { RequestHandler, Request, Response, NextFunction } from 'express';

export const notifyUser: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    //TODO: this one will send out the emails alerting of completed translations posted in redis by tms
    res.sendStatus(200);
};
