export class Department {
    public id?: any;
    public code?: string;
    public name?: string;
    public hasSon?: Boolean;
    public createTime?: string;

    constructor(
        id?: any,
        code?: string,
        name?: string,
        hasSon?: Boolean,
        createTime?: string,
    ) {
        this.id = id ? id : null;
        this.code = code ? code : null;
        this.name = name ? name : null;
        this.hasSon = hasSon ? hasSon : false;
        this.createTime = createTime ? createTime : null;
    }
}
