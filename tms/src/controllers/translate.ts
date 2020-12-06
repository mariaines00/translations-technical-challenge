import { RequestHandler, Request, Response, NextFunction } from 'express';

import { isEmpty } from './../utils/utils';
import { jsonRedis } from './../configs/redis';
import { SubtitlesFileData } from './../models/Subtitles';

export const translate: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    if(isEmpty(req.body) || req.body.email === "") {
        res.sendStatus(400);
        return;
    }

    const mail = req.body.email;

    jsonRedis.get(mail, ...['lines']).then((data) => {
        console.log(data as SubtitlesFileData);
    })
    .catch(err => console.log(err) );

    res.sendStatus(200);
};
