import { Role } from './role.model';

export class User {
    public id?: any;
    public login?: string;
    public password?: string;
    public name?: string;
    public department?: object;
    public departmentId?: number;
    public gender?: number;
    public idCard?: string;
    public phone?: string;
    public email?: string;
    public activated?: Boolean;
    public langKey?: string;
    public roles?: Role[];
    public createdBy?: string;
    public createdDate?: Date;
    public lastModifiedBy?: string;
    public lastModifiedDate?: Date;
    public jobTitle?: string;
    public position?: string;

    constructor(
        id?: any,
        login?: string,
        password?: string,
        name?: string,
        gender?: number,
        department?: object,
        departmentId?: number,
        idCard?: string,
        phone?: string,
        email?: string,
        activated?: Boolean,
        langKey?: string,
        roles?: any[],
        createdBy?: string,
        createdDate?: Date,
        lastModifiedBy?: string,
        lastModifiedDate?: Date,
        jobTitle?: string,
        position?: string
    ) {
        this.id = id ? id : null;
        this.login = login ? login : null;
        this.password = password ? password : null;
        this.name = name ? name : null;
        this.gender = gender ? gender : null;
        this.department = department ? department : null;
        this.departmentId = departmentId ? departmentId : null;
        this.idCard = idCard ? idCard : null;
        this.phone = phone ? phone : null;
        this.email = email ? email : null;
        this.activated = activated ? activated : false;
        this.langKey = langKey ? langKey : null;
        this.roles = roles ? roles : null;
        this.createdBy = createdBy ? createdBy : null;
        this.createdDate = createdDate ? createdDate : null;
        this.lastModifiedBy = lastModifiedBy ? lastModifiedBy : null;
        this.lastModifiedDate = lastModifiedDate ? lastModifiedDate : null;
        this.jobTitle = jobTitle ? this.jobTitle : null;
        this.position = position ? this.position : null;
    }
}
