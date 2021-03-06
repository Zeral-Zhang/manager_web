import { Component, TemplateRef } from '@angular/core';
import { Principal } from '../../../../../core/auth/principal.service';
import { JhiEventManager } from 'ng-jhipster';
import { FormBuilder } from '@angular/forms';
import { ToastService } from '../../../../../core/toast/toast.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { MaterialManageService } from './material-manage.service';
import { ITEMS_PER_PAGE } from '../../../../../core/constants/pagination.constants';
import { Material } from './material-manage.model';
import { ResponseWrapper } from '../../../../../core/model/response-wrapper.model';
import { Supplier } from '../supplier-manage/supplier-manage.model';
import { Type } from '../type-manage/type-manage.model';


@Component({
    selector: 'app-config-role-list',
    templateUrl: './material-manage.component.html',
    styleUrls: ['./material-manage.component.scss'],
    providers: [],
})
export class MaterialManageComponent {
    finProArry = [];
    staffArray = [];
    proArry = [];
    public stackTypes = [];
    public materialData: Material[]; // 列表数据
    public supplierData: Supplier[]; // 供应商列表
    public typeData: Type[]; // 类型数据
    itemsPerPage: any = ITEMS_PER_PAGE; // 分页数量
    totalCount: any = 0; // 总数量
    page: any = 0; // 当前页数
    private currentMaterial = new Material(); // 当前选中
    currentSearch = '';  // 当前搜索过滤数据
    currentSearchType = '3'; // 当前搜索过滤数据
    public addContentRef: BsModalRef; // 添加修改弹框
    public typeContentRef: BsModalRef; // 添加修改弹框
    public confirmRef: BsModalRef;  // 确认弹窗

    constructor(
        private principal: Principal,
        private eventManager: JhiEventManager,
        public materialManageService: MaterialManageService,
        private modalService: BsModalService,
        public fb: FormBuilder,
        public toast: ToastService
    ) {
        this.principal.identity().then((account) => {
            this.loadAll();
            this.querySupplier();
        });
    }


    loadAll() {
        this.materialManageService.query({
            query: [this.currentSearch, this.currentSearchType],
            page: this.page,
            size: this.itemsPerPage
        }).subscribe(
            (res: ResponseWrapper) => this.onSuccess(res.json, res.headers)
        );
    }

    typeQuery() {
        this.page = 0;
        this.materialManageService.query({
            query: [this.currentSearch, this.currentSearchType],
            page: this.page,
            size: this.itemsPerPage
        }).subscribe(
            (res: ResponseWrapper) => this.onSuccess(res.json, res.headers)
        );
    }

    /***
     * 获取供应商
     */
    querySupplier() {
        this.materialManageService.querySupplier().subscribe(
            (res: ResponseWrapper) => this.onSuccess1(res.json)
        );
    }

    /**
     * 分页成功方法，从header中拿到分页数据，body中拿到数据
     * @param data
     * @param headers
     */
    private onSuccess(data, headers) {
        this.totalCount = headers.get('X-Total-Count');
        this.materialData = data;
    }

    /****
     * 获取供应商
     * @param data
     */
    private onSuccess1(data) {
        console.log(data);
        this.supplierData = data;
        console.log(this.supplierData);
    }


    /***
     * 获取可选类型
     * @param data
     */
    private onSuccess2(data) {
        this.typeData = data;
        for (let i = 0; i < this.typeData.length; i++) {
            if (this.typeData[i].checked) {
                this.proArry.push(this.typeData[i].id);
            }
        }
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
    public update(template: TemplateRef<any>, Info: Material) {
        this.currentMaterial = Info;
        this.addContentRef = this.modalService.show(template);
    }


    /***
     * 修改类型
     */
    public changeType(template: TemplateRef<any>, Info: Material) {
        this.currentMaterial = Info;
        this.materialManageService.queryType({
            query: this.currentMaterial.id
        }).subscribe(
            (res: ResponseWrapper) => {
                this.onSuccess2(res.json);
                this.typeContentRef = this.modalService.show(template);
            }
        );

    }


    /**
     * 展示弹窗
     */
    public showAddModal(template: TemplateRef<any>) {
        this.currentMaterial = new Material();
        this.addContentRef = this.modalService.show(template);
    }

    /**
     * 添加/修改提交表单事件
     */
    public onSubmit() {
        // 用form表单中的Id来判断是添加还是修改的操作
        if (this.currentMaterial.id != null) {
            this.materialManageService.update(this.currentMaterial).subscribe((response) => this.onOperatorSuccess(response));
        } else {
            console.log(this.currentMaterial);
            this.materialManageService.create(this.currentMaterial).subscribe((response) => this.onOperatorSuccess(response));
        }
    }


    /***
     * 修改类型
     */
    public onSubmit1() {
        if (this.proArry.length <= 0) {
            this.toast.error('请至少选择一个类型！');
            return false;
        }
        this.materialManageService.updateMaterial(this.currentMaterial.id, this.proArry);
        this.onOperatorSuccess1();
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

    /***
     * 修改类型成功
     * @param result
     */
    private onOperatorSuccess1() {
        this.typeContentRef.hide();
    }

    /**
     * 删除弹窗
     * @param template
     */
    onDeleteConfirm(temp, template: TemplateRef<any>) {
        this.currentMaterial = temp;
        this.confirmRef = this.modalService.show(template, {class: 'modal-sm'});
    }

    /***
     * 删除逻辑
     */
    confirm(): void {
        this.materialManageService.delete(this.currentMaterial.id).subscribe(() => {
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
        } else if (modalName === 'typeContent') {
            this.typeContentRef.hide();
        }
    }


    // 选中类型
    saveSpecification(isselect, temp) {
        this.finProArry = [];
        if (isselect === true) {
            if (this.findArrExistEle(this.proArry, temp) === 0) {
                this.proArry.push(temp);
            }
            for (let i = 0; i < this.proArry.length; i++) {
                this.finProArry.push(this.proArry[i]);
            }
        } else {
            for (let i = 0; i < this.proArry.length; i++) {
                if (this.proArry[i] !== temp) {
                    this.finProArry.push(this.proArry[i]);
                }
            }
        }
        this.proArry = this.finProArry;
    }

    findArrExistEle(arr: string[], data: string): number {
        let isokk = 0;
        for (let i = 0; i < arr.length; i++) {
            if (data === arr[i]) {
                isokk = 1;
            }
        }
        return isokk;
    }

}

