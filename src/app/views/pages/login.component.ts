import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JhiEventManager } from 'ng-jhipster';
import { LoginService } from '../../../core/auth/login.service';
import { ToastrService } from 'ngx-toastr';
import { StateStorageService } from '../../../core/auth/state-storage.service';
import { Principal } from '../../../core/auth/principal.service';

@Component({
    templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit{

    password: string;
    rememberMe: boolean;
    username: string;

    constructor(
                private principal: Principal,
                private eventManager: JhiEventManager,
                public router: Router,
                private toast: ToastrService,
                private stateStorageService: StateStorageService,
                private loginService: LoginService) {
    }

    ngOnInit(): void {
        if (this.principal.isAuthenticated()) {
            const redirect = this.stateStorageService.getUrl();
            if (redirect) {
                this.stateStorageService.storeUrl(null);
                this.router.navigate([redirect]);
            }
            this.router.navigate(['/dashboard']).then(() => {
            });
        }
    }

    login() {
        this.loginService.login({
            username: this.username,
            password: this.password,
            rememberMe: this.rememberMe
        }).then(() => {
            this.toast.success('登录成功');

            this.eventManager.broadcast({
                name: 'authenticationSuccess',
                content: 'Sending Authentication Success'
            });
            // // previousState was set in the authExpiredInterceptor before being redirected to login modal.
            // // since login is succesful, go to stored previousState and clear previousState
            const redirect = this.stateStorageService.getUrl();
            if (redirect) {
                this.stateStorageService.storeUrl(null);
                this.router.navigate([redirect]);
            }
            this.router.navigate(['/dashboard']).then(() => {
            });
        }).catch(() => {
            this.toast.error('登录失败，请检查你的用户名或密码');
        });
    }

}
