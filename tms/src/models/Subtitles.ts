export type Line = {
    index: number, 
    start: string,
    end: string,
    text: string
}

export type SubtitlesFileData = {
    client_email: string,
    lines : Line[]
}
