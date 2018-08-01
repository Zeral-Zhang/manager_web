import { InfrastructureRoutingModule } from './infrastructure-routing.module';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { TreeModule } from 'angular-tree-component';
import { TreeviewModule } from 'ngx-treeview';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { SharedModule } from '../../../../core/shared.module';
import { PaginationModule } from 'ngx-bootstrap';
import { SupplierManageComponent } from './supplier-manage/supplier-manage.component';
import { SupplierManageService } from './supplier-manage/supplier-manage.service';
import { PurchaseManageComponent } from './purchase-manage/purchase-manage.component';
import { PurchaseManageService } from './purchase-manage/purchase-manage.service';
import { TypeManageComponent } from './type-manage/type-manage.component';
import { TypeManageService } from './type-manage/type-manage.service';
import { EquipmentManageComponent } from './equipment-manage/equipment-manage.component';
import { EquipmentManageService } from './equipment-manage/equipment-manage.service';
import { MaterialManageComponent } from './material-manage/material-manage.component';
import { MaterialManageService } from './material-manage/material-manage.service';

@NgModule({
    imports: [
        SharedModule,
        InfrastructureRoutingModule,
        Ng2SmartTableModule,
        PaginationModule.forRoot(),
        TreeModule,
        TreeviewModule.forRoot(),
    ],
    declarations: [
        SupplierManageComponent,
        PurchaseManageComponent,
        TypeManageComponent,
        MaterialManageComponent,
        EquipmentManageComponent,
    ],
    providers: [
        SupplierManageService,
        PurchaseManageService,
        TypeManageService,
        MaterialManageService,
        EquipmentManageService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class InfrastructureModule {
}
