import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
import { Principal } from '../../../../core/auth/principal.service';
import { JhiEventManager } from 'ng-jhipster';
import { ResponseWrapper } from '../../../../core/model/response-wrapper.model';
import { ToastService } from '../../../../core/toast/toast.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import {ProListService} from './pro-list.service';
import {Project} from '../proList.model';
import {ITEMS_PER_PAGE} from '../../../../core/constants/pagination.constants';
import {ActivatedRoute} from '@angular/router';

@Component({
    templateUrl: 'pro-list.component.html',
    styleUrls: ['./pro-list.component.scss'],
})
export class ProListComponent implements OnInit {
    // 分页
    itemsPerPage: any = ITEMS_PER_PAGE;
    currentSearch = '';  // 当前搜索过滤数据
    totalCount: any = 0;
    page: any = 0;
    public projectsData: Project;

    isSaving: Boolean;
    public department = null;
    // 添加修改信息弹框addProjectContentRef
    public addProjectContentRef: BsModalRef;
    // 确认弹窗
    confirmRef: BsModalRef;

    public form: FormGroup; // 新增用户表单

    constructor(
        private principal: Principal,
        private eventManager: JhiEventManager,
        public proListService: ProListService,
        private modalService: BsModalService,
        public fb: FormBuilder,
        public toast: ToastService
    ) {
    }

    ngOnInit() {
        this.principal.identity().then((account) => {
            this.loadAll();
        });
        this.form = this.fb.group({
            id: null,
            code: null,
            name: null,
            hasSon: false,
            createTime: null
        });
    }


    loadAll() {
        this.proListService.query({
            query: this.currentSearch,
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
        this.projectsData = data;
    }
    /**
     * 检索查询分页
     * @param query 查询数据
     */
    onSearch() {
        if (!this.currentSearch) {
            return this.clear();
        }
        this.page = 0;
        this.loadAll();
    }

    /**
     * 清空检索输入框
     */
    clear() {
        this.page = 0;
        this.currentSearch = '';
        this.loadAll();
    }

    public updatePro(addProjectContent, departInfo) {
        this.form.setValue(departInfo);
        this.addProjectContentRef = this.modalService.show(addProjectContent);
    }


    public addPro(addProjectContent) {
        this.form.setValue(this.form.value);
        this.addProjectContentRef = this.modalService.show(addProjectContent);
    }


    public onSubmit(value) {
        if (value.id != null) {
            this.proListService.updatePro(value).subscribe((response) => this.onSaveSuccess(response), () => this.onSaveError());
        }
    }

    private onSaveSuccess(result) {
        this.loadAll();
        this.isSaving = false;
        this.addProjectContentRef.hide();
    }

    private onSaveError() {
        this.isSaving = false;
    }


    /**
     * 删除项目逻辑
     * @param user
     * @param template
     */
    onDeleteConfirm(project, template: TemplateRef<any>) {
        this.confirmRef = this.modalService.show(template, {class: 'modal-sm'});
    }

    confirm(): void {
        this.proListService.delete(this.confirmRef.content).subscribe((response) => {
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
        if (modalName === 'addProjectContent') {
            this.addProjectContentRef.hide();
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
