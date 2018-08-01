import { Component, TemplateRef } from '@angular/core';
import { Principal } from '../../../../core/auth/principal.service';
import { JhiEventManager } from 'ng-jhipster';
import { FormBuilder } from '@angular/forms';
import { ToastService } from '../../../../core/toast/toast.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ProcessManageService } from './process-manage.service';
import { ITEMS_PER_PAGE } from '../../../../core/constants/pagination.constants';
import { Process } from './process-manage.model';
import { ResponseWrapper } from '../../../../core/model/response-wrapper.model';


@Component({
    selector: 'app-config-role-list',
    templateUrl: './process-manage.component.html',
    styleUrls: ['./process-manage.component.scss'],
    providers: [],
})
export class ProcessManageComponent {
    public processData: Process[]; // 列表数据
    public parentData: Process[]; // 父列表数据
    itemsPerPage: any = ITEMS_PER_PAGE; // 分页数量
    totalCount: any = 0; // 总数量
    page: any = 0; // 当前页数
    public currentProcess: Process; // 当前选中工序
    public parentProcess = '';
    currentSearch = '';  // 当前搜索过滤数据
    public addProcessContentRef: BsModalRef; // 添加修改用户信息弹框
    public confirmRef: BsModalRef;  // 确认弹窗

    constructor(
        private principal: Principal,
        private eventManager: JhiEventManager,
        public processManageService: ProcessManageService,
        private modalService: BsModalService,
        public fb: FormBuilder,
        public toast: ToastService
    ) {
        this.principal.identity().then((account) => {
            this.loadAll();
        });
    }


    /***
     * 获取列表数据
     */
    loadAll() {
        this.parentProcess = '';
        this.processManageService.query({
            query: this.currentSearch,
            page: this.page,
            size: this.itemsPerPage
        }).subscribe(
            (res: ResponseWrapper) => this.onSuccess(res.json, res.headers)
        );
        this.queryParentProcess();
    }


    /***
     * 获取父工序列表
     */
    queryParentProcess() {
        this.processManageService.queryProcess().subscribe(
            (res: ResponseWrapper) => this.onSuccess1(res.json)
        );
    }

    /***
     * 获取父工序列表
     */
    private onSuccess1(data) {
        console.log(data);
        this.parentData = data;
        console.log(this.parentData);
    }

    /**
     * 分页成功方法，从header中拿到分页数据，body中拿到数据
     * @param data
     * @param headers
     */
    private onSuccess(data, headers) {
        this.totalCount = headers.get('X-Total-Count');
        this.processData = data;
    }

    /**
     * 检索查询分页
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

    /**
     * 分页事件
     * @param event
     */
    pageChanged(event: any): void {
        this.page = event.page - 1;
        this.itemsPerPage = event.itemsPerPage;
        this.loadAll();
    }


    /**
     * 修改
     * @param template 模板
     * @param processInfo 工序信息
     */
    public updateProcess(template: TemplateRef<any>, processInfo: Process) {
        this.currentProcess = Object.assign(new Process(), processInfo);
        this.addProcessContentRef = this.modalService.show(template);
    }

    /**
     * 展示弹窗
     */
    public showAddProcessModal(template: TemplateRef<any>) {
        this.currentProcess = new Process();
        this.addProcessContentRef = this.modalService.show(template);
    }

    /**
     * 添加/修改用户提交表单事件
     */
    public onSubmit() {
        this.currentProcess.parentId = this.parentProcess;
        console.log(this.parentProcess);
        // 用form表单中的Id来判断是添加还是修改的操作
        if (this.currentProcess.id != null) {
            this.processManageService.update(this.currentProcess).subscribe((response) => this.onOperatorProcessSuccess(response));
        } else {
            this.processManageService.create(this.currentProcess).subscribe((response) => this.onOperatorProcessSuccess(response));
        }
    }

    /**
     * 操作成功
     * @param result
     */
    private onOperatorProcessSuccess(result) {
        this.page = 0;
        this.loadAll();
        this.addProcessContentRef.hide();
    }

    /**
     * 删除弹窗
     * @param template
     */
    onDeleteConfirm(process, template: TemplateRef<any>) {
        this.currentProcess = process;
        this.confirmRef = this.modalService.show(template, {class: 'modal-sm'});
    }

    /***
     * 删除逻辑
     */
    confirm(): void {
        this.processManageService.delete(this.currentProcess.id).subscribe(() => {
            this.confirmRef.hide();
            this.page = 0;
            this.loadAll();
        });
    }

    decline(): void {
        this.confirmRef.hide();
    }

    /**
     * 关闭弹出框
     * @param modalName
     */
    closeModal(modalName) {
        if (modalName === 'addProcessContentRef') {
            this.parentProcess = '';
            this.addProcessContentRef.hide();
        } else if (modalName === 'confirmTemplate') {
            this.confirmRef.hide();
        }
    }

}

