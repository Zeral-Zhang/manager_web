import { Injectable, OnDestroy } from '@angular/core';
import { JhiEventManager } from 'ng-jhipster';
import { Subscription } from 'rxjs/Rx';
import { GlobalConfig, ToastrService } from 'ngx-toastr';

export const ToastTypes = {
    SUCCESS: 'success',
    ERROR: 'error',
    INFO: 'info',
    WARNING: 'warning'
};

@Injectable()
export class ToastService implements OnDestroy {
    options: GlobalConfig;
    alerts: any[];
    cleanHttpErrorListener: Subscription;

    constructor(public toastrService: ToastrService, private eventManager: JhiEventManager) {
        this.options = this.toastrService.toastrConfig;
        this.alerts = [];

        this.options.timeOut = 3000;
        this.options.enableHtml = true;
        this.options.tapToDismiss = true;
        this.options.progressBar = true;
        this.options.preventDuplicates = true;
        this.options.progressAnimation = 'increasing';

        this.cleanHttpErrorListener = eventManager.subscribe('managerApp.httpError', (response) => {
            let i;
            const httpResponse = response.content;
            switch (httpResponse.status) {
                // connection refused, server not reachable
                case 0:
                    this.error('网络不可用');
                    break;

                case 400:
                    const arr = Array.from(httpResponse.headers._headers);
                    const headers = [];
                    for (i = 0; i < arr.length; i++) {
                        if (arr[i][0].endsWith('app-error') || arr[i][0].endsWith('app-params')) {
                            headers.push(arr[i][0]);
                        }
                    }
                    headers.sort();
                    let errorHeader = null;
                    let entityKey = null;
                    if (headers.length > 1) {
                        errorHeader = httpResponse.headers.get(headers[0]);
                        entityKey = httpResponse.headers.get(headers[1]);
                    }
                    if (errorHeader) {
                        this.error(decodeURI(errorHeader), null, {entityName: entityKey});
                    } else if (httpResponse.text() !== '' && httpResponse.json() && httpResponse.json().fieldErrors) {
                        const fieldErrors = httpResponse.json().fieldErrors;
                        for (i = 0; i < fieldErrors.length; i++) {
                            const fieldError = fieldErrors[i];
                            // convert 'something[14].other[4].id' to 'something[].other[].id' so translations can be written to it
                            const convertedField = fieldError.field.replace(/\[\d*\]/g, '[]');
                            const fieldName = convertedField.charAt(0).toUpperCase() +
                                convertedField.slice(1);
                            this.error(
                                '错误字段："' + fieldName + '"', '错误消息：' + fieldError.message, {fieldName});
                        }
                    } else if (httpResponse.text() !== '' && httpResponse.json() && httpResponse.json().message) {
                        this.error(httpResponse.json().message, httpResponse.json().message, httpResponse.json().params);
                    } else {
                        this.error(httpResponse.text());
                    }
                    break;

                case 404:
                    this.error('404 Not Found');
                    break;

                default:
                    if (httpResponse.text() !== '' && httpResponse.json() && httpResponse.json().message) {
                        this.error(httpResponse.json().message);
                    } else {
                        this.error(httpResponse.text());
                    }
            }
        });
    }

    ngOnDestroy() {
        if (this.cleanHttpErrorListener !== undefined && this.cleanHttpErrorListener !== null) {
            this.eventManager.destroy(this.cleanHttpErrorListener);
            this.alerts = [];
        }
    }

    error(message, key?, data?) {
        this.openToast(message, key, ToastTypes.ERROR);
    }

    success(message, key?, data?) {
        this.openToast(message, key, ToastTypes.SUCCESS);
    }

    info(message, key?, data?) {
        this.openToast(message, key, ToastTypes.INFO);
    }

    warning(message, key?, data?) {
        this.openToast(message, key, ToastTypes.WARNING);
    }

    openToast(message: string, title?: string, type = ToastTypes.SUCCESS, option?) {
        const opt = JSON.parse(JSON.stringify(this.options));
        this.toastrService[type](message, title, Object.assign(this.options, option));
    }

}
