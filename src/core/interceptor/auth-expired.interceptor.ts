import { JhiHttpInterceptor } from 'ng-jhipster';
import { Injector } from '@angular/core';
import { RequestOptionsArgs, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { LoginService } from '../auth/login.service';
import { ToastService } from '../toast/toast.service';

export class AuthExpiredInterceptor extends JhiHttpInterceptor {

    constructor(private injector: Injector, private router: Router) {
        super();
    }

    requestIntercept(options?: RequestOptionsArgs): RequestOptionsArgs {
        return options;
    }

    responseIntercept(observable: Observable<Response>): Observable<Response> {
        return <Observable<Response>> observable.catch((error, source) => {
            if (error.status === 401) {
                const loginService: LoginService = this.injector.get(LoginService);
                const toastError: ToastService = this.injector.get(ToastService);
                toastError.error('用户未授权');
                loginService.logout();
                this.router.navigate(['login']);
            }
            return Observable.throw(error);
        });
    }
}
