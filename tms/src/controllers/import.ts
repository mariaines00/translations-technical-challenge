import { RequestHandler, Request, Response, NextFunction } from 'express';

import { TranslationData } from './../models/Translation';
import { redisClient } from './../configs/redis';

export const importData: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    const data: TranslationData = req.body;

    if (isEmpty(data)) { //TODO: extra data validations
        res.sendStatus(400);
        return;
    }
    
    data.forEach(el => {
        redisClient.HMSET(el.source, el);
    });

    res.sendStatus(200);
};

function isEmpty(o: Object) {
    for(var i in o){
        if(o.hasOwnProperty(i)){
            return false;
        }
    }
    return true;
}
