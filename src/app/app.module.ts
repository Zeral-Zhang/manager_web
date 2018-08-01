import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { Ng2Webstorage } from 'ngx-webstorage';
import { UserRouteAccessService } from '../core/auth/user-route-access-service';

import { AppComponent } from './app.component';
// Import containers
import { FullLayoutComponent, SimpleLayoutComponent } from './containers';
// Import components
import {
    APP_SIDEBAR_NAV, AppAsideComponent, AppBreadcrumbsComponent, AppFooterComponent, AppHeaderComponent, AppSidebarComponent, AppSidebarFooterComponent,
    AppSidebarFormComponent, AppSidebarHeaderComponent, AppSidebarMinimizerComponent
} from './components';
// Import directives
import { AsideToggleDirective, NAV_DROPDOWN_DIRECTIVES, ReplaceDirective, SIDEBAR_TOGGLE_DIRECTIVES } from './directives';
// Import routing module
import { AppRoutingModule } from './app.routing';
// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { HashLocationStrategy, LocationStrategy, registerLocaleData } from '@angular/common';
import locale from '@angular/common/locales/zh-Hans';
import { NgProgressBrowserXhr, NgProgressModule } from 'ngx-progressbar';
import { BrowserXhr } from '@angular/http';
import { SharedModule } from '../core/shared.module';
import { LoginComponent } from './views/pages/login.component';
import { P404Component } from './views/pages/404.component';
import { P500Component } from './views/pages/500.component';
import { RegisterComponent } from './views/pages/register.component';

const APP_CONTAINERS = [
    FullLayoutComponent,
    SimpleLayoutComponent
];


const APP_COMPONENTS = [
    AppAsideComponent,
    AppBreadcrumbsComponent,
    AppFooterComponent,
    AppHeaderComponent,
    AppSidebarComponent,
    AppSidebarFooterComponent,
    AppSidebarFormComponent,
    AppSidebarHeaderComponent,
    AppSidebarMinimizerComponent,
    APP_SIDEBAR_NAV
];


const APP_DIRECTIVES = [
    AsideToggleDirective,
    NAV_DROPDOWN_DIRECTIVES,
    ReplaceDirective,
    SIDEBAR_TOGGLE_DIRECTIVES
];

const COMMON_COMPONENTS = [
    LoginComponent,
    RegisterComponent,
    P404Component,
    P500Component,
];

@NgModule({
    imports: [
        BrowserModule,
        SharedModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        Ng2Webstorage.forRoot({prefix: 'zeral', separator: '-'}),
        ToastrModule.forRoot(), // ToastrModule added
        BsDropdownModule.forRoot(),
        TabsModule.forRoot(),
        ChartsModule,
        NgProgressModule
    ],
    declarations: [
        AppComponent,
        ...COMMON_COMPONENTS,
        ...APP_CONTAINERS,
        ...APP_COMPONENTS,
        ...APP_DIRECTIVES,
    ],
    providers: [
        {
            provide: LocationStrategy,
            useClass: HashLocationStrategy
        },
        UserRouteAccessService,
        { provide: BrowserXhr, useClass: NgProgressBrowserXhr }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor() {
        registerLocaleData(locale);
    }
}
