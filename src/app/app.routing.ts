import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import {
    FullLayoutComponent,
    SimpleLayoutComponent
} from './containers';
import {EventListModule} from './views/event-list/eventList.module';
import { P404Component } from './views/pages/404.component';
import { P500Component } from './views/pages/500.component';
import { LoginComponent } from './views/pages/login.component';
import { RegisterComponent } from './views/pages/register.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
    },
    {
        path: '',
        component: FullLayoutComponent,
        data: {
            title: '首页'
        },
        children: [
            {
                path: 'dashboard',
                loadChildren: './views/dashboard/dashboard.module#DashboardModule'
            },
            {
                path: 'event_list',
                loadChildren: './views/event-list/eventList.module#EventListModule'
            },
            {
                path: 'basic',
                loadChildren: './views/basic/basic.module#BasicModule',
            },
            {
                path: 'base_config',
                loadChildren: './views/base-config/base-config.module#BaseConfigModule'
            },
            {
                path: 'pro_manage',
                loadChildren: './views/pro-manage/pro-manage.module#ProManageModule'
            },
            {
                path: 'inventory_manage',
                loadChildren: './views/inventory-manage/inventory-manage.module#InventoryManageModule'
            }
        ]
    },
    {
        path: '',
        component: SimpleLayoutComponent,
        children: [
            {
                path: '500',
                component: P500Component,
                data: {
                    title: '500页面出错'
                }
            },
            {
                path: 'login',
                component: LoginComponent,
                data: {
                    title: '登录'
                }
            },
            {
                path: 'register',
                component: RegisterComponent,
                data: {
                    title: '注册'
                }
            },
            {
                path: '404',
                component: P404Component,
                data: {
                    title: '404页面不存在'
                }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
