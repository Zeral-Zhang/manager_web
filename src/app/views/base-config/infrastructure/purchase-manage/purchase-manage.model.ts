import { Supplier } from '../supplier-manage/supplier-manage.model';

export class Purchase {
    public id?: any;
    public name?: string;
    public type?: string;
    public supplierId?: string;
    public createTime?: Date;
    public supplier?: Supplier;

    constructor(
        id?: any,
        name?: string,
        type?: string,
        supplierId?: string,
        createTime?: Date,
        supplier?: Supplier
    ) {
        this.id = id ? id : null;
        this.name = name ? name : null;
        this.type = type ? type : null;
        this.supplierId = supplierId ? supplierId : null;
        this.supplier = supplier ? supplier : null;
        this.createTime = createTime ? createTime : null;
    }
}
