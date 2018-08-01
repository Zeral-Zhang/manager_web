export class LineBody {
    public name: string;
    public id: number;
}

export class LineProcess {
    public id: number;
    public name: string;
    public sort: number;
    public lineId: number;
    public lineBody: LineBody;
}
export class LineBodyAndProcessVM {
    public lineBody: LineBody;
    public  lineProcesses: LineProcess[];
}
export class Process {
    public id?: any;
    public name?: string;
    public checked: boolean;

    constructor(
        id?: any,
        name?: string,
        checked?: boolean
    ) {
        this.id = id ? id : null;
        this.name = name ? name : null;
        this.checked = checked ? this.checked : null;
    }
}
