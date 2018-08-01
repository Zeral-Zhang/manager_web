import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EventListComponent} from './event-list.component';

const routes: Routes = [
    {
        path: '',
        component: EventListComponent,
        data: {
            title: '进度看板'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EventListRoutingModule {}
