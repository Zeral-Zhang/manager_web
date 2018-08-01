import { Component, TemplateRef } from '@angular/core';
import { Principal } from '../../../../../core/auth/principal.service';
import { JhiEventManager } from 'ng-jhipster';
import { FormBuilder } from '@angular/forms';
import { ToastService } from '../../../../../core/toast/toast.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { TypeManageService } from './type-manage.service';
import { ITEMS_PER_PAGE } from '../../../../../core/constants/pagination.constants';
import { Type } from './type-manage.model';
import { ResponseWrapper } from '../../../../../core/model/response-wrapper.model';
import { Supplier } from '../supplier-manage/supplier-manage.model';
import { Equipment } from '../equipment-manage/equipment-manage.model';


@Component({
    selector: 'app-config-role-list',
    templateUrl: './type-manage.component.html',
    styleUrls: ['./type-manage.component.scss'],
    providers: [],
})
export class TypeManageComponent {
    public typeData: Type[]; // 列表数据
    public supplierData: Supplier[]; // 供应商列表
    public equipmentData: Equipment[]; // 设备列表
    public currentSupplierId: string; // 选中的供应商
    itemsPerPage: any = ITEMS_PER_PAGE; // 分页数量
    totalCount: any = 0; // 总数量
    page: any = 0; // 当前页数
    private currentType = new Type(); // 当前选中
    currentSearch = '';  // 当前搜索过滤数据
    public addContentRef: BsModalRef; // 添加修改弹框
    public confirmRef: BsModalRef;  // 确认弹窗

    constructor(
        private principal: Principal,
        private eventManager: JhiEventManager,
        public typeManageService: TypeManageService,
        private modalService: BsModalService,
        public fb: FormBuilder,
        public toast: ToastService
    ) {
        this.principal.identity().then((account) => {
            this.loadAll();
            this.querySupplier();
            this.currentSupplierId = '';
        });
    }


    loadAll() {
        this.typeManageService.query({
            query: this.currentSearch,
            page: this.page,
            size: this.itemsPerPage
        }).subscribe(
            (res: ResponseWrapper) => this.onSuccess(res.json, res.headers)
        );
    }

    querySupplier() {
        this.typeManageService.querySupplier().subscribe(
            (res: ResponseWrapper) => this.onSuccess1(res.json, res.headers)
        );
    }

    changeSupplier() {
        this.typeManageService.queryEquipment({
            query: this.currentSupplierId
        }).subscribe(
            (res: ResponseWrapper) => this.onSuccess2(res.json)
        );
    }

    /**
     * 分页成功方法，从header中拿到分页数据，body中拿到数据
     * @param data
     * @param headers
     */
    private onSuccess(data, headers) {
        this.totalCount = headers.get('X-Total-Count');
        this.typeData = data;
    }

    private onSuccess1(data, headers) {
        console.log(data);
        this.supplierData = data;
        console.log(this.supplierData);
    }

    private onSuccess2(data) {
        console.log(data);
        this.equipmentData = data;
        console.log(this.equipmentData);
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
     */
    public update(template: TemplateRef<any>, Info: Type) {
        this.currentType = Info;
        this.querySupplier();
        if (this.currentType.equipment != null) {
            this.currentSupplierId = this.currentType.equipment.supplierId;
        }
        this.changeSupplier();
        this.addContentRef = this.modalService.show(template);
    }

    /**
     * 展示弹窗
     */
    public showAddModal(template: TemplateRef<any>) {
        this.currentSupplierId = '';
        this.currentType = new Type();
        this.addContentRef = this.modalService.show(template);
    }

    /**
     * 添加/修改提交表单事件
     */
    public onSubmit() {
        // 用form表单中的Id来判断是添加还是修改的操作
        if (this.currentType.id != null) {
            this.typeManageService.update(this.currentType).subscribe((response) => this.onOperatorSuccess(response));
        } else {
            console.log(this.currentType);
            this.typeManageService.create(this.currentType).subscribe((response) => this.onOperatorSuccess(response));
        }
    }

    /**
     * 操作成功
     * @param result
     */
    private onOperatorSuccess(result) {
        this.page = 0;
        this.loadAll();
        this.addContentRef.hide();
    }

    /**
     * 删除弹窗
     * @param template
     */
    onDeleteConfirm(temp, template: TemplateRef<any>) {
        this.currentType = temp;
        this.confirmRef = this.modalService.show(template, {class: 'modal-sm'});
    }

    /***
     * 删除逻辑
     */
    confirm(): void {
        this.typeManageService.delete(this.currentType.id).subscribe(() => {
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
        if (modalName === 'addContentRef') {
            this.addContentRef.hide();
        } else if (modalName === 'confirmTemplate') {
            this.confirmRef.hide();
        }
    }

}

