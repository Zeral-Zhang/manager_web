import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { SharedModule } from '../../../core/shared.module';
import { PaginationModule } from 'ngx-bootstrap';
import { ProListComponent } from './pro-list/pro-list.component';
import { ProListService } from './pro-list/pro-list.service';
import { ProManageRoutingModule } from './pro-manage.routing.module';
import { ProCreateComponent } from './pro-create/pro-create.component';
import { ProCreateService } from './pro-create/pro-create.service';
import { ProUpdateService } from './pro-update/pro-update.service';
import { ProUpdateComponent } from './pro-update/pro-update.component';
import { DashboardService } from '../dashboard/dashboard.service';
import { ProInfoComponent } from './pro-info/pro-info.component';
import { ProInfoService } from './pro-info/pro-info.service';
import { ProTrackingComponent } from './pro-tracking/pro-tracking.component';
import { ProTrackingService } from './pro-tracking/pro-tracking.service';
import { DepartmentManageService } from '../basic/department-manage/department-manage.service';

@NgModule({
    imports: [
        SharedModule,
        ProManageRoutingModule,
        PaginationModule.forRoot(),
        TabsModule.forRoot(),
    ],
    declarations: [
        ProListComponent,
        ProCreateComponent,
        ProUpdateComponent,
        ProInfoComponent,
        ProTrackingComponent
    ],
    providers: [
        ProListService,
        ProCreateService,
        ProUpdateService,
        DashboardService,
        ProInfoService,
        ProTrackingService,
        DepartmentManageService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProManageModule {
}
