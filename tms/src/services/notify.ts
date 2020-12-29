import * as http from 'http';

export function notify(email_key: string): void | Error {
    const options = {
        host: process.env.SERVER_URL,
        port: process.env.SERVER_PORT,
        path: `/notify?email=${email_key}`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        }
    };
    const req = http.request(options, (response: http.IncomingMessage) => {
        response.on('data', (d) => {
           console.log(d);
        })
    });

    req.on('error', (error) => {
        console.error(error);
        return new Error('Failed to notify server');
    });
    
    req.end();
}
