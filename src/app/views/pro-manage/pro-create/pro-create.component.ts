import { Component, OnInit } from '@angular/core';
import { ITEMS_PER_PAGE } from '../../../../core/constants/pagination.constants';
import { Principal } from '../../../../core/auth/principal.service';
import { ToastService } from '../../../../core/toast/toast.service';
import { ProCreateService } from './pro-create.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Project } from './project.model';

@Component({
    templateUrl: 'pro-create.component.html',
    styleUrls: ['./pro-create.component.scss'],
})
export class ProCreateComponent implements OnInit {
    // 页签跳转页面标识
    flag1 = true;
    flag2 = false;
    flag3 = false;

    // 页签可用标识
    able1 = false;
    able2 = true;
    able3 = true;
    public proCreateForm: FormGroup;
    public data = [1, 2, 3];
    // 分页
    itemsPerPage: any = ITEMS_PER_PAGE;
    totalCount: any = 0;
    page: any = 0;
    modalRef: BsModalRef;
    userType;
    selectUsers = [];
    principals = [];
    constructor(
        private principal: Principal,
        public toast: ToastService,
        private modalService: BsModalService,
        public procreateService: ProCreateService,
        public fb: FormBuilder,
    ) {
    }

    ngOnInit() {
        this.principal.identity().then((account) => {
            this.loadAll();
        });
        this.proCreateForm = this.fb.group({
            name: [null, Validators.compose([Validators.required])],
            simpleName: [null, Validators.compose([Validators.required])],
            principal: [null, Validators.compose([Validators.required])],
            participants: [null, Validators.compose([Validators.required])],
            des: [null, Validators.compose([Validators.required])]
        });
    }

    // 选择项目基础信息
    projectContent(){
        // 跳转页面标识
        this.flag1 = true;
        this.flag2 = false;
    }


    onSelect(modalContent, type) {
        this.userType = type;
        this.modalRef = this.modalService.show(modalContent, {class: 'modal-lg'});
    }

    onSubmit(value: Project) {
        this.flag1 = false;
        this.flag2 = true;
        this.able2 = false;
        console.log(value);
    }

    loadAll() {
        // this.procreateService.query({
        //     page: this.page,
        //     size: this.itemsPerPage
        // }).subscribe(
        //     (res: ResponseWrapper) => this.onSuccess(res.json, res.headers)
        // );
    }

    /**
     * 分页成功方法，从header中拿到分页数据，body中拿到数据
     * @param data
     * @param headers
     */
    private onSuccess(data, headers) {
        this.totalCount = headers.get('X-Total-Count');
        // this.projectData = data;
    }

    /**
     * 分页事件
     * @param event
     */
    pageChanged(event: any): void {
        this.page = event.page - 1;
        this.itemsPerPage = event.itemsPerPage;
        this.loadAll();
    }

    deleteItem(i) {
    }

    addUser() {
        switch (this.userType) {
            case 'principal':
                this.principals = this.selectUsers;
                break;
            default:
                break;
        }
        this.selectUsers = [];
        this.modalRef.hide();
    }

    onSelectedChange(event) {
        this.selectUsers = event;
    }
}
