import { JhiHttpInterceptor } from 'ng-jhipster';
import { RequestOptionsArgs, Response } from '@angular/http';
import { Injector } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ToastService } from '../toast/toast.service';

export class NotificationInterceptor extends JhiHttpInterceptor {

    private toastService: ToastService;

    // tslint:disable-next-line: no-unused-variable
    constructor(private injector: Injector) {
        super();
        setTimeout(() => this.toastService = injector.get(ToastService));
    }

    requestIntercept(options?: RequestOptionsArgs): RequestOptionsArgs {
        return options;
    }

    responseIntercept(observable: Observable<Response>): Observable<Response> {
        return observable.map((response: Response) => {
            const headers = [];
            response.headers.forEach((value, name) => {
                if (name.toLowerCase().endsWith('app-alert') || name.toLowerCase().endsWith('app-params')) {
                    headers.push(name);
                }
            });
            if (headers.length > 1) {
                headers.sort();
                const alertKey = response.headers.get(headers[0]);
                if (typeof alertKey === 'string') {
                    if (this.toastService) {
                        this.toastService.success(decodeURI(alertKey));
                    }
                }
            }
            return response;
        }).catch((error) => {
            return Observable.throw(error); // here, response is an error
        });
    }
}
