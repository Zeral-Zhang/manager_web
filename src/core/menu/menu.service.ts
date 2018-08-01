import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { Menu } from './menu.model';
import { ResponseWrapper } from '../model/response-wrapper.model';

@Injectable()
export class MenuService {

    // 用于暂存菜单
    public navigation: Menu[];

    private resourceUrl = 'api/menus';

    constructor(private http: Http) {
    }

    query(): Observable<ResponseWrapper> {
        return this.http.get('api/InRoleMenus').map((res: Response) => this.convertResponse(res));
    }

    /**
     * 获取菜单
     *
     * @param {boolean} force 是否强制刷新
     * @returns {Promise<any>}
     */
    getMenus(force?: boolean): Promise<any> {
        if (force === true) {
            this.navigation = undefined;
        }

        // check and see if we have retrieved the userIdentity data from the server.
        // if we have, reuse it by immediately resolving
        if (this.navigation) {
            return Promise.resolve(this.navigation);
        }

        // retrieve the userIdentity data from the server, update the identity object, and then resolve.
        return this.query().toPromise().then((response) => {
            const data = response.json;
            if (data) {
                this.navigation = data;
            } else {
                this.navigation = null;
            }
            return this.navigation;
        }).catch((err) => {
            this.navigation = null;
            return null;
        });
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(null, result, res.status);
    }

    /**
     * Convert a returned JSON object to Menu.
     */
    private convertItemFromServer(json: any): Menu {
        const entity: Menu = Object.assign(new Menu(), json);
        return entity;
    }
}
