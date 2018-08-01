import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BaseConfigRoutingModule } from './base-config.routing.module';
import { LineManageComponent } from './line-manage/line-manage.component';
import { LineManagerService } from './line-manage/line-manage.service';
import { FormsModule } from '@angular/forms';
import { ProcessManageComponent } from './process_manage/process-manage.component';
import { ProcessManageService } from './process_manage/process-manage.service';
import { PaginationModule } from 'ngx-bootstrap';
import { SharedModule } from '../../../core/shared.module';

@NgModule({
  imports: [
      SharedModule,
      PaginationModule.forRoot(),
      BaseConfigRoutingModule,
      FormsModule
  ],
  declarations: [
      LineManageComponent,
      ProcessManageComponent
  ],
    providers: [
        LineManagerService,
        ProcessManageService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BaseConfigModule { }
