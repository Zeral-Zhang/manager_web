import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { ResponseWrapper } from '../../../core/model/response-wrapper.model';
import {Plan, Project} from './dashboard.model';
import {createRequestOption} from '../../../core/model/request-util';

@Injectable()
export class DashboardService {

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
            .map((res: Response) => this.convertResponse(res, 0));
    }
    queryFalseEvent(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get('api/false-workPlans', options)
            .map((res: Response) => this.convertResponse(res, 1));
    }
    querySuccessEvent(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get('api/successful-workPlans', options)
            .map((res: Response) => this.convertResponse(res, 1));
    }
    private convertResponse(res: Response, flag: any): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        if (flag === 0) {
            for (let i = 0; i < jsonResponse.length; i++) {
                result.push(this.convertItemFromServer(jsonResponse[i]));
            }
        } else if (flag === 1) {
            for (let i = 0; i < jsonResponse.length; i++) {
                result.push(this.convertItemFromServer1(jsonResponse[i]));
            }
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
    private convertItemFromServer1(json: any): Plan {
        const entity: Plan = Object.assign(new Plan(), json);
        return entity;
    }
}
