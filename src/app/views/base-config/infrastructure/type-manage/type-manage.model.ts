import { Equipment } from '../equipment-manage/equipment-manage.model';

export class Type {
    public id?: any;
    public content?: string;
    public equipmentId?: string;
    public createTime?: Date;
    public equipment?: Equipment;
    public checked?: boolean;

    constructor(
        id?: any,
        content?: string,
        equipmentId?: string,
        createTime?: Date,
        equipment?: Equipment,
        checked?: boolean
    ) {
        this.id = id ? id : null;
        this.content = content ? content : null;
        this.equipmentId = equipmentId ? equipmentId : null;
        this.equipment = equipment ? equipment : null;
        this.createTime = createTime ? createTime : null;
        this.checked = this.checked ? this.checked : false;
    }
}
