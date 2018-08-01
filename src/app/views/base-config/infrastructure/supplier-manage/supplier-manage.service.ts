import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { ResponseWrapper } from '../../../../../core/model/response-wrapper.model';
import { createRequestOption } from '../../../../../core/model/request-util';
import { Supplier } from './supplier-manage.model';

@Injectable()
export class SupplierManageService {

    private resourceUrl = 'api/supplier';

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
    create(supplier: Supplier): Observable<ResponseWrapper> {
        return this.http.post(this.resourceUrl, supplier)
            .map((res: Response) => this.convertResponse(res));
    }

    /***
     * 修改
     * @param {Supplier} supplier
     * @returns {Observable<ResponseWrapper>}
     */
    update(supplier: Supplier): Observable<ResponseWrapper> {
        return this.http.put(this.resourceUrl, supplier)
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
     * Convert a returned JSON object to Supplier.
     */
    private convertItemFromServer(json: any): Supplier {
        const entity: Supplier = Object.assign(new Supplier(), json);
        return entity;
    }
}
