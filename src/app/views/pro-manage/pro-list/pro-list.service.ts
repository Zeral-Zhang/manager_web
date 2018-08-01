import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { ResponseWrapper } from '../../../../core/model/response-wrapper.model';
import { createRequestOption } from '../../../../core/model/request-util';
import {Project} from '../proList.model';

@Injectable()
export class ProListService {

    private resourceUrl = 'api/project';

    constructor(private http: Http) {
    }


    /**
     * 分页查询项目数据，传参可包括过滤filter数据，sort排序数据等
     *
     * @param req 请求参数
     * @returns {Observable<ResponseWrapper>} 返回结果封装为ResponseWrapper，body封装为User用户
     */
    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get('api/projects', options)
            .map((res: Response) => this.convertResponse(res));
    }


    private convertResponse(res: Response): ResponseWrapper {
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
    private convertItemFromServer(json: any): Project {
        const entity: Project = Object.assign(new Project(), json);
        return entity;
    }


    /***
     * 更新项目
     * @param treeOfTree
     * @returns {Promise<any>}
     */
    updatePro(project: Project): Observable<ResponseWrapper> {
        return this.http.put(this.resourceUrl, project)
            .map((res: Response) => this.convertResponse(res));
    }


    /***
     * 新增部门
     * @param treeOfTree
     * @returns {Promise<any>}
     */
    addPro(project: Project): Observable<ResponseWrapper> {
        return this.http.post(this.resourceUrl, project)
            .map((res: Response) => this.convertResponse(res));
    }


    /***
     * 删除部门
     * @param {number} departmentId
     * @returns {Observable<Response>}
     */
    delete(proId: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${proId}`);
    }
}
