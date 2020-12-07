import { distance } from 'fastest-levenshtein';
import { redisClient, jsonRedis } from '../configs/redis';
import { Line, SubtitlesFileData } from './../models/Subtitles';

export async function translation(mail: string, lines: Line[]): Promise<Error | void> {    
    lines.forEach(line => {
        redisClient.hget(line.text, "target" , function (err, data) {
            console.dir(data);
            if(err || data === null) {
                console.error('Key not found');
            } else {
                if( distance(line.text, data) < 5 ) {
                    line.text = data;
                }
            }
        });
    });

    const new_hash: SubtitlesFileData = {
        client_email: mail,
        lines,
    }

    console.log(new_hash);
    jsonRedis.set(mail, new_hash);
}
