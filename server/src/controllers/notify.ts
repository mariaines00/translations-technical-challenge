import { RequestHandler, Request, Response, NextFunction } from 'express';

import { transporter } from './../configs/nodemailer';
import { Email } from './../models/Email';
import { isEmpty } from './../utils/utils';
import { jsonRedis } from './../configs/redis';
import { Line } from './../models/Subtitles';

export const notifyUser: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    if(isEmpty(req.query) || req.query.email === "") {
        res.sendStatus(400);
        return;
    }
    const mail = req.query.email!.toString();

    let options: Email = {
        from: 'translations@lengoo.com',
        subject: 'Your translations are ready',
        to: mail,
        text: '<translations>'
    }

    jsonRedis.get(mail, ...['lines']).then((data) => {
        if (data && data.lines as Line[]) {
            options.text = rebuild(data.lines as Line[]);
            sendEmail(options);
            jsonRedis.del(mail);
            res.sendStatus(200);
        }
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

function sendEmail(options: any): void {
    transporter.sendMail(options, function(error, info){
        if(error) {
            //res.sendStatus(500);
            console.log(error);
        }
        console.log('Message sent: ' + info.response);
    });
}
