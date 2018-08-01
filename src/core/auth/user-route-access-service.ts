import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';

import { Principal } from './principal.service';
import { StateStorageService } from './state-storage.service';
import { ToastService } from '../toast/toast.service';
import { MenuService } from '../menu/menu.service';

@Injectable()
export class UserRouteAccessService implements CanActivate, CanActivateChild {

    isInNav = false;

    constructor(
        private navService: MenuService,
        private toastService: ToastService,
        private stateStorageService: StateStorageService,
        private router: Router,
        private principal: Principal) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Promise<boolean> {

        // We need to call the checkLogin / and so the principal.identity() function, to ensure,
        // that the client has a principal too, if they already logged in by the server.
        // This could happen on a page refresh.
        return this.navService.getMenus().then(nav => {
            if (!nav) {
                return false;
            }
            // 用户访问地址是否在动态菜单中，证明用户是当前角色菜单使用者
            if (!this.isInDynamicNav(nav, state.url)) {
                this.toastService.error('没有权限');
                this.stateStorageService.storeUrl(state.url);
                this.router.navigate(['login']).then(() => {
                });
                return false;
            }
            return this.checkLogin(state.url);
        });
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Promise<boolean> {
        return this.canActivate(childRoute, state);
    }

    checkLogin(url: string): Promise<boolean> {
        return Promise.resolve(this.principal.identity().then((account) => {

            // 未登录
            if (!account) {
                this.stateStorageService.storeUrl(url);
                this.toastService.error('未登录');
                this.router.navigate(['login']).then(() => {
                });
                return false;
            }

            return true;
        }));
    }

    /**
     * 当前登录地址是否在加载动态菜单中
     *
     * @param navs
     * @param url
     * @returns {boolean}
     */
    isInDynamicNav(navs, url): boolean {
        if (!url) {
            return false;
        }

        for (let i = 0; i < navs.length; i++) {
            // 找到了，结束递归
            if (this.isInNav) {
                break;
            }
            const nav = navs[i];
            // 菜单不存在，或者地址和子菜单都不存在，下一个
            if (!nav || (!nav.url && !nav.children)) {
                continue;
            }
            // 地址存在
            if (nav.url === url) {
                this.isInNav = true;
                break;
            } else {
                if (nav.children) {
                    this.isInDynamicNav(nav.children, url);
                }
            }
        }
        return this.isInNav;
    }
}
