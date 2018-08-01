import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LineManageComponent } from './line-manage/line-manage.component';
import { ProcessManageComponent } from './process_manage/process-manage.component';

const routes: Routes = [
    {
        path: '',
        data: {
            title: '基础配置'
        },
        children: [
            {
                path: 'line-manage',
                component: LineManageComponent,
                data: {
                    title: '工艺流程'
                }
            },
            {
                path: 'process-manage',
                component: ProcessManageComponent,
                data: {
                    title: '工序管理'
                }
            },
            {
                path: 'infrastructure',
                loadChildren: './infrastructure/infrastructure.module#InfrastructureModule',
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BaseConfigRoutingModule {
}
