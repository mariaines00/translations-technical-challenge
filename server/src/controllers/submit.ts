import { RequestHandler, Request, Response, NextFunction } from 'express';

import { jsonRedis } from './../configs/redis';
import { SubtitlesFile } from './../models/Subtitles';
import { isEmpty } from './../utils/utils';
import { alertTMS }  from './../services/tms';

export const submitFile: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    if (isEmpty(req.body)) {
        res.sendStatus(400);
        return;
    }

    if(isEmpty(req.query) || req.query.email === "") {
        res.sendStatus(400);
        return;
    }
    
    const mail = req.query.email!.toString();
    
    const raw: string[] = req.body.split(/\r?\n/);
    const file = new SubtitlesFile(raw, mail);
    const lines = file.getLines;

    if(!lines.length) {
        res.sendStatus(400);
        return;
    }

    jsonRedis.set(mail, file).then(() => {
        res.status(200).send(file);
        alertTMS(mail);
   });
};
