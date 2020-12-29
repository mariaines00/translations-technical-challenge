import { RequestHandler, Request, Response, NextFunction } from 'express';

import { isEmpty } from './../utils/utils';
import { jsonRedis } from './../configs/redis';
import { translation } from './../services/translation';
import { notify } from './../services/notify';

export const translate: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    if(isEmpty(req.body) || req.body.email === "") {
        res.sendStatus(400);
        return;
    }
    const mail = req.body.email;

    jsonRedis.get(mail, ...['lines']).then((data) => {
        if (data?.lines) {
            translation(mail, data.lines);
        }
    })
    .catch(err => console.log(err));

    notify(mail);

    res.sendStatus(200);
};
