import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { SharedModule } from '../../../core/shared.module';
import {EventListComponent} from './event-list.component';
import {EventListService} from './eventList.service';
import {EventListRoutingModule} from './eventList-routing.module';
import {PaginationModule} from 'ngx-bootstrap';

@NgModule({
    imports: [
        SharedModule,
        EventListRoutingModule,
        PaginationModule.forRoot(),
        ChartsModule,
        BsDropdownModule,
    ],
    declarations: [
        EventListComponent,
    ],
    providers: [
        EventListService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EventListModule {
}
