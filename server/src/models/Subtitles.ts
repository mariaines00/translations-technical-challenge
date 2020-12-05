export class Line {
    constructor(private index: number, private start: string, private end: string, private text: string) { }

    public get getLineNumber() : number {
        return this.index;
    }
    
    public get getLineText() : string {
        return this.text;
    }

    public get getStartTimestamp() : string {
        return this.start;
    }

    public get getEndTimestamp() : string {
        return this.end;
    }   
}
export class SubtitlesFile {
    private lines: Line[] = [];

    constructor(input: string[], private client_email: string) {
       input.forEach(e => {
           if(!e.length) {
                return;
           }
           const data = e.split(" ", 4);
           const line = new Line(
               +data[0],
               data[1].substring(1),
               data[3].slice(0, -1),
               e.split("] ")[1]
           )
        this.lines.push(line);
       });
    }

    public get getLines() : Line[] {
        return this.lines;
    }

    public get getClientEmail() : string {
        return this.client_email;
    }
    
}
