import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { User } from '../../user/user.model';

@Injectable()
export class SelectUserService {

  constructor(private http: Http) { }

    getDepartment(): Observable<any> {
        return this.http.get('api/departmentsNgxTree') .map((res: Response) => res.json());
    }

    queryDepartmentUsers(depatmentId: any): Observable<User[]> {
        return this.http.get(`api/departmentUsers/${depatmentId}`)
            .map((res: Response) => res.json());
    }
}
