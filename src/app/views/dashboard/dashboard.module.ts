import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardService } from './dashboard.service';
import { SharedModule } from '../../../core/shared.module';

@NgModule({
    imports: [
        SharedModule,
        DashboardRoutingModule,
        ChartsModule,
        BsDropdownModule,
    ],
    declarations: [
        DashboardComponent,
    ],
    providers: [
        DashboardService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DashboardModule {
}
