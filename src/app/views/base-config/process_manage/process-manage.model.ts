export class Process {
    public id?: any;
    public name?: string;
    public parentId?: any;
    public parentProcess?: Process;
    public createTime?: string;

    constructor(
        id?: any,
        name?: string,
        parentId?: any,
        parentProcess?: Process,
        createTime?: string,
    ) {
        this.id = id ? id : null;
        this.name = name ? name : null;
        this.parentId = parentId ? parentId : null;
        this.parentProcess = parentProcess ? parentProcess : null;
        this.createTime = createTime ? createTime : null;
    }
}
