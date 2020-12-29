import { transporter } from './../configs/nodemailer';
import { Email } from './../models/Email';

export function sendEmail(mail: string, text: string): boolean {
    let options: Email = {
        from: 'translations@lengoo.com',
        subject: 'Your translations are ready',
        to: mail,
        text: text
    }

    transporter.sendMail(options, function(error, info){
        if(error) {
            console.log(error);
            return false;
        }
        console.log('Message sent: ' + info.response);
        return true;
    });
    
    return false;
}