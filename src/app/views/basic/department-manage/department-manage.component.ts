import { Component, OnInit, TemplateRef } from '@angular/core';
import {DepartmentManageService} from './department-manage.service';
import { ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ITEMS_PER_PAGE } from '../../../../core/constants/pagination.constants';
import { Principal } from '../../../../core/auth/principal.service';
import { JhiEventManager } from 'ng-jhipster';
import { ResponseWrapper } from '../../../../core/model/response-wrapper.model';
import { ToastService } from '../../../../core/toast/toast.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Department } from './department-manage.model';

@Component({
    templateUrl: 'department-manage.component.html',
    styleUrls: ['./department-manage.component.scss'],
})
export class DepartmentManageComponent implements OnInit {
    // 分页
    public departmentData: Department[];
    itemsPerPage: any = ITEMS_PER_PAGE;
    routeData: any;
    totalCount: any = 0;
    page: any = 0;

    isSaving: Boolean;


    public selectDepartment: Department;

    // 添加修改信息弹框
    public addDepartmentContentRef: BsModalRef;
    // 确认弹窗
    confirmRef: BsModalRef;

    public form: FormGroup; // 新增用户表单

    constructor(
        private principal: Principal,
        private eventManager: JhiEventManager,
        public departmentManageService: DepartmentManageService,
        private modalService: BsModalService,
        public fb: FormBuilder,
        public toast: ToastService
    ) {
    }

    ngOnInit() {
        this.principal.identity().then((account) => {
            this.loadAll();
        });
        /*-------新增部门表单------*/
        this.form = this.fb.group({
            id: null,
            name: null,
            hasSon: false,
            createTime: null
        });
    }

    /**
     * 加载部门列表
     */
    loadAll() {
        this.departmentManageService.query({
            page: this.page,
            size: this.itemsPerPage
        }).subscribe(
            (res: ResponseWrapper) => this.onSuccess(res.json, res.headers)
        );
    }

    /**
     * 分页成功方法，从header中拿到分页数据，body中拿到数据
     * @param data
     * @param headers
     */
    private onSuccess(data, headers) {
        this.totalCount = headers.get('X-Total-Count');
        this.departmentData = data;
    }

    /**
     * 修改部门信息
     * @param addDepartContent
     * @param departInfo
     */
    public updateDepartment(addDepartContent, departInfo) {
        this.form.setValue(departInfo);
        this.addDepartmentContentRef = this.modalService.show(addDepartContent);
    }

    /**
     * 添加部门
     * @param addDepartContent
     */
    public addDepartment(addDepartContent) {
        this.selectDepartment = new Department();
        this.addDepartmentContentRef = this.modalService.show(addDepartContent);
    }

    /**
     * 添加/删除部门提交表单事件
     * @param value
     */
    public onSubmit(value) {
        // 用form表单中的userId来判断是添加部门还是修改部门的操作
        if (value.id != null) {
            this.departmentManageService.updateDep(value).subscribe((response) => this.onSaveSuccess(response), () => this.onSaveError());
        }
    }

    private onSaveSuccess(result) {
        this.loadAll();
        this.isSaving = false;
        this.addDepartmentContentRef.hide();
    }

    private onSaveError() {
        this.isSaving = false;
    }


    /**
     * 删除部门逻辑
     * @param user
     * @param template
     */
    onDeleteConfirm(user, template: TemplateRef<any>) {
        this.confirmRef = this.modalService.show(template, {class: 'modal-sm'});
    }

    confirm(): void {
        this.departmentManageService.delete(this.confirmRef.content).subscribe((response) => {
        });
        this.confirmRef.hide();
    }

    decline(): void {
        this.confirmRef.hide();
    }

    /**
     * 关闭弹出框
     * @param modalName
     */
    closeModal(modalName) {
        if (modalName === 'addDepartContent') {
            this.addDepartmentContentRef.hide();
        } else if (modalName === 'confirm') {
            this.confirmRef.hide();
        }
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
}
