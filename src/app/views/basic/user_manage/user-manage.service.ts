import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { ResponseWrapper } from '../../../../core/model/response-wrapper.model';
import { createRequestOption } from '../../../../core/model/request-util';
import { User } from '../../../../core/user/user.model';

@Injectable()
export class UserManageService {

    private resourceUrl = 'api/users';

    constructor(private http: Http) { }

    create(user: User): Observable<ResponseWrapper> {
        return this.http.post(this.resourceUrl, user)
            .map((res: Response) => this.convertResponse(res));
    }

    update(user: User): Observable<ResponseWrapper> {
        return this.http.put(this.resourceUrl, user)
            .map((res: Response) => this.convertResponse(res));
    }

    find(login: string): Observable<User> {
        return this.http.get(`${this.resourceUrl}/${login}`).map((res: Response) => res.json());
    }

    /**
     * 分页查询用户数据，传参可包括过滤filter数据，sort排序数据等
     *
     * @param req 请求参数
     * @returns {Observable<ResponseWrapper>} 返回结果封装为ResponseWrapper，body封装为User用户
     */
    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(login: string): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${login}`);
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
    private convertItemFromServer(json: any): User {
        const entity: User = Object.assign(new User(), json);
        return entity;
    }
}
