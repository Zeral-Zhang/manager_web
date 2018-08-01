import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ResponseWrapper } from '../../../../core/model/response-wrapper.model';
import { ProjectDetail } from './proInfo.model';

@Injectable()
export class ProInfoService {
    constructor(private http: Http) {
    }
    find(id: number): Observable<ProjectDetail> {
        return this.http.get(`api/project/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    private convertResponse(res: Response, flag: number): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to User.
     * Type
     */
    private convertItemFromServer(json: any): ProjectDetail {
        const entity: ProjectDetail = Object.assign(new ProjectDetail(), json);
        return entity;
    }
}
