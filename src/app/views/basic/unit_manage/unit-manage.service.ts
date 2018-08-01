import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { ResponseWrapper } from '../../../../core/model/response-wrapper.model';
import { createRequestOption } from '../../../../core/model/request-util';
import { Units } from './unit-manage.model';

@Injectable()
export class UnitManageService {

    private resourceUrl = 'api/units';

    constructor(private http: Http) {
    }


    /**
     * 分页查询数据，传参可包括过滤filter数据，sort排序数据等
     *
     * @param req 请求参数
     * @returns {Observable<ResponseWrapper>} 返回结果封装为ResponseWrapper，body封装为User用户
     */
    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }




    /***
     * 新增
     * @param
     * @returns {Promise<any>}
     */
    create(unit: Units): Observable<ResponseWrapper> {
        return this.http.post(this.resourceUrl, unit)
            .map((res: Response) => this.convertResponse(res));
    }

    /***
     * 修改
     * @param {Units} unit
     * @returns {Observable<ResponseWrapper>}
     */
    update(unit: Units): Observable<ResponseWrapper> {
        return this.http.put(this.resourceUrl, unit)
            .map((res: Response) => this.convertResponse(res));
    }

    /***
     * 删除
     * @param {number} departmentId
     * @returns {Observable<Response>}
     */
    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
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
    private convertItemFromServer(json: any): Units {
        const entity: Units = Object.assign(new Units(), json);
        return entity;
    }
}
