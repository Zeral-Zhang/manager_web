import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgJhipsterModule } from 'ng-jhipster';
import { ModalModule } from 'ngx-bootstrap';

@NgModule({
    imports: [
        ModalModule.forRoot(),
        NgJhipsterModule.forRoot({
            alertAsToast: false,
        }),
    ],
    exports: [
        ModalModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgJhipsterModule,
    ]
})
export class SharedLibsModule {
}
