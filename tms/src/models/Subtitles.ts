export type SubtitlesFileData = {
    client_email: string,
    lines : {
        index: number, 
        start: string,
        end: string,
        text: string
    }[]
}
