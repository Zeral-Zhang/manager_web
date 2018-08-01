import { BasicRoutingModule } from './basic-routing.module';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { UserManageComponent } from './user_manage/user-manage.component';
import { TreeModule } from 'angular-tree-component';
import { TreeviewModule } from 'ngx-treeview';
import { UserManageService } from './user_manage/user-manage.service';
import { SharedModule } from '../../../core/shared.module';
import { PaginationModule } from 'ngx-bootstrap';
import { DepartmentManageService } from './department-manage/department-manage.service';
import { DepartmentManageComponent } from './department-manage/department-manage.component';
import { StaffManageService } from './staff_manage/staff-manage.service';
import { StaffManageComponent } from './staff_manage/staff-manage.component';
import { RoleService } from './role_manage/role.service';
import {RoleManageComponent} from './role_manage/role-manage.component';
import {UnitManageComponent} from './unit_manage/unit-manage.component';
import { UnitManageService } from './unit_manage/unit-manage.service';


@NgModule({
    imports: [
        SharedModule,
        BasicRoutingModule,
        PaginationModule.forRoot(),
        TreeModule,
        TreeviewModule.forRoot(),
    ],
    declarations: [
        UserManageComponent,
        DepartmentManageComponent,
        RoleManageComponent,
        UnitManageComponent,
        StaffManageComponent
    ],
    providers: [
        UserManageService,
        RoleService,
        UserManageService,
        DepartmentManageService,
        RoleManageComponent,
        StaffManageService,
        UnitManageService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BasicModule {
}
