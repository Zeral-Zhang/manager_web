import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import {ResponseWrapper} from '../../../../core/model/response-wrapper.model';
import {createRequestOption} from '../../../../core/model/request-util';
@Injectable()
export class InventoryCreateService {
    constructor(private http: Http) {
    }


    // /**
    //  * 分页查projectTypes数据，传参可包括过滤filter数据，sort排序数据等
    //  *
    //  * @param req 请求参数
    //  * @returns {Observable<ResponseWrapper>} 返回结果封装为ResponseWrapper，body封装为User用户
    //  */
    // queryTypes(req?: any): Observable<ResponseWrapper> {
    //     const options = createRequestOption(req);
    //     return this.http.get('api/projectTypes', options)
    //         .map((res: Response) => this.convertResponse(res, 0));
    // }
    // /**
    //  * 分页查project数据，传参可包括过滤filter数据，sort排序数据等
    //  *
    //  * @param req 请求参数
    //  * @returns {Observable<ResponseWrapper>} 返回结果封装为ResponseWrapper，body封装为User用户
    //  */
    // queryProjects(req?: any): Observable<ResponseWrapper> {
    //     const options = createRequestOption(req);
    //     return this.http.get('api/projectTemplates', options)
    //         .map((res: Response) => this.convertResponse(res, 1));
    // }
    // /***
    //  * 更新
    //  */
    // updateType(projectType: ProjectType): Observable<ResponseWrapper> {
    //     return this.http.put('api/projectType', projectType)
    //         .map((res: Response) => this.convertResponse(res, 0));
    // }
    // /***
    //  * 新增
    //  */
    // addType(projectType: ProjectType): Observable<ResponseWrapper> {
    //     return this.http.post('api/projectType', projectType)
    //         .map((res: Response) => this.convertResponse(res, 0));
    // }
    //
    //
    // /***
    //  * 删除部门
    //  */
    // deleteType(id: number): Observable<Response> {
    //     return this.http.delete(`api/projectType/${id}`);
    // }
    //
    // private convertResponse(res: Response, flag: number): ResponseWrapper {
    //     const jsonResponse = res.json();
    //     const result = [];
    //     for (let i = 0; i < jsonResponse.length; i++) {
    //        if (flag === 0) {
    //            result.push(this.convertItemFromServer(jsonResponse[i]));
    //        } else {
    //            result.push(this.convertItemFromServer1(jsonResponse[i]));
    //        }
    //     }
    //     return new ResponseWrapper(res.headers, result, res.status);
    // }
    //
    // /**
    //  * Convert a returned JSON object to User.
    //  * Type
    //  */
    // private convertItemFromServer(json: any): ProjectType {
    //     const entity: ProjectType = Object.assign(new ProjectType(), json);
    //     return entity;
    // }
    // private convertItemFromServer1(json: any): ProjectTemplate {
    //     const entity: ProjectTemplate = Object.assign(new ProjectTemplate(), json);
    //     return entity;
    // }
}
