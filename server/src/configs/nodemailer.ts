import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
        user: 'fbb365028300a3',
        pass: '418770c3c4372c'
    }
});
