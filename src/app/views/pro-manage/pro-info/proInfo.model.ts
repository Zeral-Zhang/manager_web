export class ProjectDetail {
    public id: number;
    public name: string;
    public simpleName: string;
    public proPlanId: number;
    public createTime: string;
    public startTime: string;
    public des: string;
    public state: any;
    public planName: string;
    public workPlanName: string;
    public principalView: string;
    public participants:  Participant;
    percent: string;
}
export class Participant {
    public id: number;
    public name: string;
    public department: Department;
    public phone: string;
}
export class Department {
    id: number;
    name: string;
}
