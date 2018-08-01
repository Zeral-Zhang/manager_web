import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { ResponseWrapper } from '../../../../../core/model/response-wrapper.model';
import { createRequestOption } from '../../../../../core/model/request-util';
import { Material } from './material-manage.model';
import { Supplier } from '../supplier-manage/supplier-manage.model';

@Injectable()
export class MaterialManageService {

    private resourceUrl = 'api/material';

    private resourceUrl1 = 'api/supplierNoPage';

    private resourceUrl2 = 'api/typeSpecificationSelect';

    private resourceUrl3 = 'api/typeSpecificationWithPurchase';

    private result = {};

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
     * 查询类型
     * @param req
     * @returns {Observable<ResponseWrapper>}
     */
    queryType(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl2, options)
            .map((res: Response) => this.convertResponse(res));
    }

    /***
     * 新增
     * @param {Material} purchase
     * @returns {Observable<ResponseWrapper>}
     */
    create(purchase: Material): Observable<ResponseWrapper> {
        return this.http.post(this.resourceUrl, purchase)
            .map((res: Response) => this.convertResponse(res));
    }

    /***
     * 修改
     * @param {Material} purchase
     * @returns {Observable<ResponseWrapper>}
     */
    update(purchase: Material): Observable<ResponseWrapper> {
        return this.http.put(this.resourceUrl, purchase)
            .map((res: Response) => this.convertResponse(res));
    }

    /***
     * 修改类型
     * @param {Material} purchase
     * @returns {Observable<ResponseWrapper>}
     */
    updateMaterial(id: number, purchaseIds: any): Observable<ResponseWrapper> {
        return this.http.post(this.resourceUrl3, {'purchaseId': id, 'typeIds': purchaseIds})
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
     * Convert a returned JSON object to Material.
     */
    private convertItemFromServer(json: any): Material {
        const entity: Material = Object.assign(new Material(), json);
        return entity;
    }

}
