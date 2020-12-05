import { RequestHandler, Request, Response, NextFunction } from 'express';

import { SubtitlesFile } from './../models/Subtitles';

export const submitFile: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    if (isEmpty(req.body)) {
        res.sendStatus(400);
        return;
    }
    
    const raw: string[] = req.body.split(/\r?\n/);
    const file = new SubtitlesFile(raw);

    if(!file.getLines.length) {
        res.sendStatus(400);
        return;
    }

    res.status(200).send(file);
};

function isEmpty(o: Object){
    for(var i in o){
        if(o.hasOwnProperty(i)){
            return false;
        }
    }
    return true;
}
