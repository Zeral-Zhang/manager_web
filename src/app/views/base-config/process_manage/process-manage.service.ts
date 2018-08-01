import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { ResponseWrapper } from '../../../../core/model/response-wrapper.model';
import { createRequestOption } from '../../../../core/model/request-util';
import { Process } from './process-manage.model';

@Injectable()
export class ProcessManageService {

    private resourceUrl = 'api/process';

    //  获取工序列表（不分页）
    private resourceUrl1 = 'api/processNoPage';

    constructor(private http: Http) {
    }


    /**
     * 分页查询数据，传参可包括过滤filter数据，sort排序数据等
     *
     * @param req 请求参数
     * @returns {Observable<ResponseWrapper>} 返回结果封装为ResponseWrapper，
     */
    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    /***
     * 获取工序列表（不分页）
     * @param req
     * @returns {Observable<ResponseWrapper>}
     */
    queryProcess(req?: any): Observable<ResponseWrapper> {
        return this.http.get(this.resourceUrl1)
            .map((res: Response) => this.convertResponse(res));
    }


    /***
     * 新增
     * @param
     * @returns {Promise<any>}
     */
    create(process: Process): Observable<ResponseWrapper> {
        console.log(process);
        return this.http.post(this.resourceUrl, process)
            .map((res: Response) => this.convertResponse(res));
    }

    /***
     * 修改
     * @param {Process} process
     * @returns {Observable<ResponseWrapper>}
     */
    update(process: Process): Observable<ResponseWrapper> {
        return this.http.put(this.resourceUrl, process)
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
    private convertItemFromServer(json: any): Process {
        const entity: Process = Object.assign(new Process(), json);
        return entity;
    }
}
