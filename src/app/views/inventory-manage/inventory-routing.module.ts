import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventoryListComponent } from './inventory-list/inventory-list.component';
import { InventoryCreateComponent } from './inventory-create/inventory-create.component';

const routes: Routes = [
    {
        path: '',
        data: {
            title: '清单管理'
        },
        children: [
            {
                path: 'inventory-list',
                component: InventoryListComponent,
                data: {
                    title: '清单列表'
                }
            },
            {
                path: 'inventory-create',
                component: InventoryCreateComponent,
                data: {
                    title: '创建清单'
                }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class InventoryRoutingModule {
}
