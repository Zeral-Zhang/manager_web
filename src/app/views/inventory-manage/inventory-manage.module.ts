import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SharedModule } from '../../../core/shared.module';
import { PaginationModule } from 'ngx-bootstrap';
import {InventoryRoutingModule} from './inventory-routing.module';
import {InventoryListComponent} from './inventory-list/inventory-list.component';
import {InventoryListService} from './inventory-list/inventory-list.service';
import {InventoryCreateComponent} from './inventory-create/inventory-create.component';
import {InventoryCreateService} from './inventory-create/inventory-create.service';

@NgModule({
    imports: [
        SharedModule,
        InventoryRoutingModule,
        PaginationModule.forRoot(),
    ],
    declarations: [
        InventoryListComponent,
        InventoryCreateComponent
    ],
    providers: [
        InventoryListService,
        InventoryCreateService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class InventoryManageModule {
}
