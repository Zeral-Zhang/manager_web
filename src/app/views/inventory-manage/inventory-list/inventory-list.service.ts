import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import {ResponseWrapper} from '../../../../core/model/response-wrapper.model';
import {createRequestOption} from '../../../../core/model/request-util';
import {Inventory, Project} from './inventoryList.model';
@Injectable()
export class InventoryListService {
    constructor(private http: Http) {
    }


    queryInventory(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get('api/inventory-pager', options)
            .map((res: Response) => this.convertResponse(res, 1));
    }
    queryProjects(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get('api/project-pager', options)
            .map((res: Response) => this.convertResponse(res, 0));
    }

    // updateType(projectType: ProjectType): Observable<ResponseWrapper> {
    //     return this.http.put('api/projectType', projectType)
    //         .map((res: Response) => this.convertResponse(res, 0));
    // }
    //
    // addType(projectType: ProjectType): Observable<ResponseWrapper> {
    //     return this.http.post('api/projectType', projectType)
    //         .map((res: Response) => this.convertResponse(res, 0));
    // }
    //
    // deleteType(id: number): Observable<Response> {
    //     return this.http.delete(`api/projectType/${id}`);
    // }

    private convertResponse(res: Response, flag: number): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
           if (flag === 0) {
               result.push(this.convertItemFromServer(jsonResponse[i]));
           } else {
               result.push(this.convertItemFromServer1(jsonResponse[i]));
           }
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to User.
     * Type
     */
    private convertItemFromServer(json: any): Project {
        const entity: Project = Object.assign(new Project(), json);
        return entity;
    }
    private convertItemFromServer1(json: any): Inventory {
        const entity: Inventory = Object.assign(new Inventory(), json);
        return entity;
    }
}
