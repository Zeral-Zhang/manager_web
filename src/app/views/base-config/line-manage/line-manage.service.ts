import { Injectable } from '@angular/core';
import {createRequestOption} from '../../../../core/model/request-util';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {ResponseWrapper} from '../../../../core/model/response-wrapper.model';
import {LineBody, LineBodyAndProcessVM, LineProcess, Process} from './lineManage.model';
import {Role} from '../../../../core/user/role.model';

@Injectable()
export class LineManagerService {
    constructor(private http: Http) {
    }

    queryLines(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get('api/lines', options)
            .map((res: Response) => this.convertResponse(res, 0));
    }

    queryProcess(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get('api/lineProcess', options)
            .map((res: Response) => this.convertResponse(res, 1));
    }
    /***
     * 更新
     */
    updateLine(lineBody: LineBody): Observable<ResponseWrapper> {
        return this.http.put('api/line', lineBody)
            .map((res: Response) => this.convertResponse(res, 0));
    }
    updateLineProcess(lineBodyAndProcessVM: LineBodyAndProcessVM): Observable<ResponseWrapper> {
        return this.http.put('api/lineProcess', lineBodyAndProcessVM)
            .map((res: Response) => this.convertResponse(res, 0));
    }
    /***
     * 新增
     */
    addLine(lineBody: LineBody): Observable<ResponseWrapper> {
        return this.http.post('api/line', lineBody)
            .map((res: Response) => this.convertResponse(res, 0));
    }
    /**
     * 查询所有，不分页
     */
    findAllProcess(name: string): Observable<Process[]> {
        return this.http.get(`api/processNoPage${name}`).map((res: Response) => this.convertResponse(res, 2).json);
    }

    /***
     * 删除部门
     */
    deleteLine(id: number): Observable<Response> {
        return this.http.delete(`api/line/${id}`);
    }

    private convertResponse(res: Response, flag: number): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            if (flag === 0) {
                result.push(this.convertItemFromServer(jsonResponse[i]));
            } else if (flag === 1) {
                result.push(this.convertItemFromServer1(jsonResponse[i]));
            } else if (flag === 2) {
                result.push(this.convertItemFromServer2(jsonResponse[i]));
            }
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to User.
     * Type
     */
    private convertItemFromServer(json: any): LineBody {
        const entity: LineBody = Object.assign(new LineBody(), json);
        return entity;
    }
    private convertItemFromServer1(json: any): LineProcess {
        const entity: LineProcess = Object.assign(new LineProcess(), json);
        return entity;
    }
    private convertItemFromServer2(json: any): Process {
        const entity: Process = Object.assign(new Process(), json);
        return entity;
    }
}
