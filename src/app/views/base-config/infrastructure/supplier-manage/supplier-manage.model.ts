export class Supplier {
    public id?: any;
    public name?: string;
    public fullName?: string;
    public linkMan?: string;
    public contactInformation?: string;
    public state?: boolean;
    public createTime?: string;

    constructor(
        id?: any,
        name?: string,
        fullName?: string,
        linkMan?: string,
        contactInformation?: string,
        state?: boolean,
        createTime?: string,
    ) {
        this.id = id ? id : null;
        this.name = name ? name : null;
        this.fullName = fullName ? fullName : null;
        this.linkMan = linkMan ? linkMan : null;
        this.contactInformation = contactInformation ? contactInformation : null;
        this.state = state ? state : true;
        this.createTime = createTime ? createTime : null;
    }
}
