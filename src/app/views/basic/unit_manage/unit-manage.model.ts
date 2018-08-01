export class Units {
    public id?: any;
    public code?: string;
    public name?: string;
    public createTime?: string;

    constructor(
        id?: any,
        code?: string,
        name?: string,
        createTime?: string,
    ) {
        this.id = id ? id : null;
        this.code = code ? code : null;
        this.name = name ? name : null;
        this.createTime = createTime ? createTime : null;
    }
}
