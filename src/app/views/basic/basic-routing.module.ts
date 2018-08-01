import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserManageComponent } from './user_manage/user-manage.component';
import { DepartmentManageComponent } from './department-manage/department-manage.component';
import { RoleManageComponent } from './role_manage/role-manage.component';
import { UnitManageComponent } from './unit_manage/unit-manage.component';
import { StaffManageComponent } from './staff_manage/staff-manage.component';
import { UserRouteAccessService } from '../../../core/auth/user-route-access-service';

const routes: Routes = [
    {
        path: '',
        data: {
            title: '组织管理'
        },
        children: [
            {
                path: 'user-manage',
                component: UserManageComponent,
                canActivate: [UserRouteAccessService],
                data: {
                    title: '用户管理'
                }
            },
            {
                path: 'department-manage',
                component: DepartmentManageComponent,
                data: {
                    title: '部门管理'
                }
            },
            {
                path: 'role-manage',
                component: RoleManageComponent,
                data: {
                    title: '角色管理'
                }
            },
            {
                path: 'unit-manage',
                component: UnitManageComponent,
                data: {
                    title: '单位管理'
                }
            },
            {
                path: 'staff-manage',
                component: StaffManageComponent,
                data: {
                    title: '员工管理'
                }
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BasicRoutingModule {
}
