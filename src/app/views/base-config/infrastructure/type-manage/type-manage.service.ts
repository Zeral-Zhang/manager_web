import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { ResponseWrapper } from '../../../../../core/model/response-wrapper.model';
import { createRequestOption } from '../../../../../core/model/request-util';
import { Type } from './type-manage.model';

@Injectable()
export class TypeManageService {

    private resourceUrl = 'api/typeSpecification';

    private resourceUrl1 = 'api/supplierNoPage';

    private resourceUrl2 = 'api/equipmentSupplier';

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
     * 查询供应商
     * @param req
     * @returns {Observable<ResponseWrapper>}
     */
    querySupplier(req?: any): Observable<ResponseWrapper> {
        return this.http.get(this.resourceUrl1)
            .map((res: Response) => this.convertResponse(res));
    }

    /***
     * 查询设备
     * @param req
     * @returns {Observable<ResponseWrapper>}
     */
    queryEquipment(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl2, options)
            .map((res: Response) => this.convertResponse(res));
    }

    /***
     * 新增
     * @param {Type} Type
     * @returns {Observable<ResponseWrapper>}
     */
    create(type: Type): Observable<ResponseWrapper> {
        return this.http.post(this.resourceUrl, type)
            .map((res: Response) => this.convertResponse(res));
    }

    /***
     * 修改
     * @param {Type} Type
     * @returns {Observable<ResponseWrapper>}
     */
    update(type: Type): Observable<ResponseWrapper> {
        return this.http.put(this.resourceUrl, type)
            .map((res: Response) => this.convertResponse(res));
    }

    /***
     * 删除
     * @param {number} id
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
     * Convert a returned JSON object to Type.
     */
    private convertItemFromServer(json: any): Type {
        const entity: Type = Object.assign(new Type(), json);
        return entity;
    }

}
