import { RequestHandler, Request, Response, NextFunction } from 'express';

import { transporter } from './../configs/nodemailer';
import { Email } from './../models/Email';
import { isEmpty } from './../utils/utils';


export const notifyUser: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    if(isEmpty(req.query) || req.query.email === "") {
        res.sendStatus(400);
        return;
    }
    const mail = req.query.email!.toString();

    const options: Email = {
        from: 'translations@lengoo.com',
        subject: 'Your translations are ready',
        to: mail,
        text: ''
    }

    transporter.sendMail(options, function(error, info){
        if(error) {
            res.sendStatus(500);
            console.log(error);
        }
        console.log('Message sent: ' + info.response);
        res.sendStatus(200);
    });
};
