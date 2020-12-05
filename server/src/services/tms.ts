import * as http from 'http';

function alertTMS(email_key: string): void | Error {
    const options = {
        host: process.env.TMS_URL,
        port: process.env.TMS_PORT,
        path: '/translate',
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': Buffer.byteLength(email_key)
        }
    };
    const req = http.request(options, (response: http.IncomingMessage) => {
        response.on('data', (d) => {
           console.log(d);
        })
    });

    req.on('error', (error) => {
        console.error(error);
        return new Error('Failed to call TMS');
    })
    
    req.write(email_key);
    req.end();
}

export default alertTMS;