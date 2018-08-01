import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { jqxWindowComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxwindow';
import { jqxSplitterComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxsplitter';
import { jqxTreeComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxtree';
import { SelectUserComponent } from './components/select-user/select-user.component';
import { SharedLibsModule } from './shared-libs.module';
import { TreeviewModule } from 'ngx-treeview';

@NgModule({
    imports: [
        SharedLibsModule,
        TreeviewModule.forRoot()
    ],
    declarations: [
        jqxWindowComponent,
        jqxSplitterComponent,
        jqxTreeComponent,
        SelectUserComponent,
    ],
    entryComponents: [
        jqxWindowComponent,
        jqxSplitterComponent,
        jqxTreeComponent,
        SelectUserComponent,
    ],
    exports: [
        jqxWindowComponent,
        jqxSplitterComponent,
        jqxTreeComponent,
        SelectUserComponent,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedJQWidgetsModule {
}
