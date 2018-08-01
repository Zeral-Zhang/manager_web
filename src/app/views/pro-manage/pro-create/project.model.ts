export class ProjectType {
    public id: number;
    public projectTypeName: string;
}
export class Project {
    public id: number; // id
    public name: string; // 项目名称
    public simpleName: string; // 项目简称
    public principal: string; // 项目负责人
    public des: string; // 描述
    public createTime: string; // 创建时间
    public participants: string; // 参与人员
}
