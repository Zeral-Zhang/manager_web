import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';
import { SharedLibsModule } from './shared-libs.module';
import { HasAnyAuthorityDirective } from './auth/has-any-authority.directive';
import { AccountService } from './auth/account.service';
import { StateStorageService } from './auth/state-storage.service';
import { Principal } from './auth/principal.service';
import { AuthServerProvider } from './auth/auth-jwt.service';
import { ToastService } from './toast/toast.service';
import { customHttpProvider } from './interceptor/http.provider';
import { Title } from '@angular/platform-browser';
import { MenuService } from './menu/menu.service';
import { LoginService } from './auth/login.service';
import { SharedJQWidgetsModule } from './shared-jqwidgets.module';

@NgModule({
    imports: [
        SharedJQWidgetsModule,
        SharedLibsModule
    ],
    declarations: [
        HasAnyAuthorityDirective
    ],
    providers: [
        customHttpProvider(),
        Title,
        {
            provide: LOCALE_ID,
            useValue: 'zh-Hans'
        },
        LoginService,
        AccountService,
        ToastService,
        MenuService,
        StateStorageService,
        Principal,
        AuthServerProvider,
        DatePipe
    ],
    exports: [
        SharedJQWidgetsModule,
        SharedLibsModule,
        HasAnyAuthorityDirective,
        DatePipe,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class SharedModule {
}
