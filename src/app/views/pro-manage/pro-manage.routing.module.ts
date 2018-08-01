import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProListComponent } from './pro-list/pro-list.component';
import { ProCreateComponent } from './pro-create/pro-create.component';
import { ProUpdateComponent } from './pro-update/pro-update.component';
import { ProInfoComponent } from './pro-info/pro-info.component';
import { ProTrackingComponent } from './pro-tracking/pro-tracking.component';

const routes: Routes = [
    {
        path: '',
        data: {
            title: '项目管理'
        },
        children: [
            {
                path: 'pro-list',
                component: ProListComponent,
                data: {
                    title: '项目列表'
                }
            },
            {
                path: 'pro-create',
                component: ProCreateComponent,
                data: {
                    title: '立项'
                }
            },
            {
                path: 'pro-update',
                component: ProUpdateComponent,
                data: {
                    title: '项目修改'
                }
            },
            {
                path: 'pro-info',
                component: ProInfoComponent,
                data: {
                    title: '项目详情'
                }
            },
            {
                path: 'pro-tracking',
                component: ProTrackingComponent,
                data: {
                    title: '项目跟踪'
                }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProManageRoutingModule {
}
