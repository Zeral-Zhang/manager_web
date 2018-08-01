import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserRouteAccessService } from '../../../../core/auth/user-route-access-service';
import { SupplierManageComponent } from './supplier-manage/supplier-manage.component';
import { PurchaseManageComponent } from './purchase-manage/purchase-manage.component';
import { TypeManageComponent } from './type-manage/type-manage.component';
import { EquipmentManageComponent } from './equipment-manage/equipment-manage.component';
import { MaterialManageComponent } from './material-manage/material-manage.component';

const routes: Routes = [
    {
        path: '',
        data: {
            title: '基础数据'
        },
        children: [
            {
                path: 'supplier-manage',
                component: SupplierManageComponent,
                canActivate: [UserRouteAccessService],
                data: {
                    title: '供应商管理'
                }
            },
            {
                path: 'purchase-manage',
                component: PurchaseManageComponent,
                canActivate: [UserRouteAccessService],
                data: {
                    title: '外构件管理'
                }
            }
            ,
            {
                path: 'equipment-manage',
                component: EquipmentManageComponent,
                canActivate: [UserRouteAccessService],
                data: {
                    title: '设备管理'
                }
            },
            {
                path: 'type-manage',
                component: TypeManageComponent,
                canActivate: [UserRouteAccessService],
                data: {
                    title: '型号管理'
                }
            },
            {
                path: 'material-manage',
                component: MaterialManageComponent,
                canActivate: [UserRouteAccessService],
                data: {
                    title: '材料管理'
                }
            }

        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class InfrastructureRoutingModule {
}
