import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { JhiDateUtils } from 'ng-jhipster';
import { ResponseWrapper } from '../../../../core/model/response-wrapper.model';
import { createRequestOption } from '../../../../core/model/request-util';
import { Injectable } from '@angular/core';
import { User } from '../../../../core/user/user.model';

@Injectable()
export class StaffManageService {
    private resourceUrl = 'api/users';
    private resourceUrl1 = 'api/updateUserNotRole';

    constructor(private http: Http, private dateUtils: JhiDateUtils) {
    }


    /***
     * 获取树结构
     * @returns {Promise<ErrorObservable | never | Response>}
     */
    getData() {
        return this.http.get('api/departmentsTree')
            .toPromise()
            .then(response => JSON.parse(response['_body']));
    }

    /***
     * 更新部门
     * @param treeOfTree
     * @returns {Promise<any>}
     */
    updateDep(treeOfTree: any): Observable<ResponseWrapper> {
        return this.http.put('api/departmentsTree', treeOfTree)
            .map((res: Response) => this.convertResponse(res));
    }

    /***
     * 新增部门
     * @param treeOfTree
     * @returns {Promise<any>}
     */
    saveDep(treeOfTree: any): Observable<ResponseWrapper> {
        return this.http.post('api/departmentsTree', treeOfTree)
            .map((res: Response) => this.convertResponse(res));
    }

    /***
     * 删除部门
     * @param treeOfTree
     * @returns {Promise<any>}
     */
    deleteDep(treeOfTree: any): Observable<ResponseWrapper> {
        return this.http.delete('api/departments/' + treeOfTree.id)
            .map((res: Response) => this.convertResponse(res));
    }


    /**
     * 查询用户信息
     *
     * @param req 请求参数
     * @returns {Observable<ResponseWrapper>} 返回结果封装为ResponseWrapper，body封装为User用户
     */
    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get('api/departmentUsers/', options)
            .map((res: Response) => this.convertResponse(res));
    }

    /***
     * 新建用户
     * @param {User} user
     * @returns {Observable<ResponseWrapper>}
     */
    create(user: User): Observable<ResponseWrapper> {
        return this.http.post(this.resourceUrl, user)
            .map((res: Response) => this.convertResponse(res));
    }

    /***
     * 更新用户
     * @param {User} user
     * @returns {Observable<ResponseWrapper>}
     */
    update(user: User): Observable<ResponseWrapper> {
        return this.http.put(this.resourceUrl1, user)
            .map((res: Response) => this.convertResponse(res));
    }


    /***
     * 更新用户部门
     * @param {User} user
     * @returns {Observable<ResponseWrapper>}
     */
    updateUserDepartment(user: User): Observable<ResponseWrapper> {
        return this.http.put('api/updateUserDepartment', user)
            .map((res: Response) => this.convertResponse(res));
    }

    /***
     * 删除用户
     * @param {string} login
     * @returns {Observable<Response>}
     */
    delete(login: string): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${login}`);
    }


    private convertResponse(res: Response): ResponseWrapper {
        console.log(res);
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to User.
     */
    private convertItemFromServer(json: any): User {
        const entity: User = Object.assign(new User(), json);
        return entity;
    }

    /**
     * Convert a User to a JSON which can be sent to the server.
     */
    private convert(user: User): User {
        const copy: User = Object.assign({}, user);
        return copy;
    }
}
