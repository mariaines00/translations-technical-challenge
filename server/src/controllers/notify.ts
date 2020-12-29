import { RequestHandler, Request, Response, NextFunction } from 'express';

import { isEmpty } from './../utils/utils';
import { jsonRedis } from './../configs/redis';
import { Line } from './../models/Subtitles';
import { sendEmail } from './../services/email';

export const notifyUser: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    if(isEmpty(req.query) || req.query.email === "") {
        res.sendStatus(400);
        return;
    }
    const mail = req.query.email!.toString();

    jsonRedis.get(mail, ...['lines']).then((data) => {
        if (data && data.lines as Line[]) {
            const text = rebuild(data.lines as Line[]);
            
            const reply = sendEmail(mail, text);
            if(reply) {
                jsonRedis.del(mail);
                res.sendStatus(200);
            } else {
                res.sendStatus(500);
            }
            return;
        }
        res.sendStatus(500);
    })
    .catch(err => console.log(err));

};

//wip: add this to the models
function rebuild(lines: Line[]): string {
    const res = lines.map( function(line) {
        return `${line.index} ${line.start} - ${line.end} ${line.text}`; }
    ).join("\n");
    return res;
}