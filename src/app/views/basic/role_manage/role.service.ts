import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Role } from '../../../../core/user/role.model';
import { ResponseWrapper } from '../../../../core/model/response-wrapper.model';
import {createRequestOption} from '../../../../core/model/request-util';
import {Tree} from '../../../../core/model/tree.model';
import {RoleMenus} from './roleManage.model';

@Injectable()
export class RoleService {

    private resourceUrl = 'api/roles';

    constructor(private http: Http) {
    }

    create(role: Role): Observable<Role> {
        const copy = this.convert(role);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(role: Role): Observable<Role> {
        const copy = this.convert(role);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }
    updateRoleMenus(roleMenu: RoleMenus): Observable<Role>{
        return this.http.put('/api/roleMenus', roleMenu).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }



    /**
     * 查询所有，不分页
     * @returns {Observable<Role>}
     */
    findAll(): Observable<Role[]> {
        return this.http.get(this.resourceUrl).map((res: Response) => this.convertResponse(res).json);
    }
    findMenus(code: string): Observable<Tree[]> {
        return this.http.get(`/api/roleOfMenus/${code}`).map((res: Response) => this.convertResponse1(res).json);
    }
    delete(code: string): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${code}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }
    private convertResponse1(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer1(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }
    /**
     * 分页查询角色数据，传参可包括过滤filter数据，sort排序数据等
     *
     * @param req 请求参数
     * @returns {Observable<ResponseWrapper>}
     */
    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get('api/roles-pager', options)
            .map((res: Response) => this.convertResponse(res));
    }

    find(id: number): Observable<Role> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }
    /**
     * Convert a returned JSON object to Role.
     */
    private convertItemFromServer(json: any): Role {
        const entity: Role = Object.assign(new Role(), json);
        return entity;
    }
    private convertItemFromServer1(json: any): Tree {
        const entity: Tree = Object.assign(new Tree(), json);
        return entity;
    }
    /**
     * Convert a Role to a JSON which can be sent to the server.
     */
    private convert(role: Role): Role {
        const copy: Role = Object.assign({}, role);
        return copy;
    }

}
