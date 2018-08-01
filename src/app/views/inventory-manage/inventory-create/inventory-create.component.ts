import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JhiEventManager } from 'ng-jhipster';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import {ITEMS_PER_PAGE} from '../../../../core/constants/pagination.constants';
import {ToastService} from '../../../../core/toast/toast.service';
import {Principal} from '../../../../core/auth/principal.service';
import {InventoryListService} from '../inventory-list/inventory-list.service';

@Component({
    templateUrl: 'inventory-create.component.html',
    styleUrls: ['./inventory-create.component.scss'],
})
export class InventoryCreateComponent implements OnInit {
    // 分页
    itemsPerPage: any = ITEMS_PER_PAGE;
    currentSearch = '';  // 当前搜索过滤数据
    totalCount: any = 0;
    page: any = 0;
    // 确认弹窗
    confirmRef: BsModalRef;

    public form: FormGroup; // 新增用户表单

    constructor(
        private principal: Principal,
        private inventoryCreateService: InventoryListService,
        private eventManager: JhiEventManager,
        private modalService: BsModalService,
        public fb: FormBuilder,
        public toast: ToastService
    ) {
    }

    ngOnInit() {
        // this.principal.identity().then((account) => {
        //     this.loadAll();
        // });
        // this.addTypeForm = this.fb.group({
        //     projectTypeName: [null, Validators.compose([Validators.required])],
        //     id: null
        // });
    }


    // loadAll() {
    //     this.protemplateService.queryTypes({
    //         query: '',
    //         page: this.pageType,
    //         size: this.itemsPerPage
    //     }).subscribe(
    //         (res: ResponseWrapper) => this.onSuccess(res.json, res.headers, 0)
    //     );
    // }
    //
    // loadProTemplateAll(type: ProjectType) {
    //     this.protemplateService.queryProjects({
    //         query: type.id,
    //         page: this.pageTemplate,
    //         size: this.itemsPerPage
    //     }).subscribe(
    //         (res: ResponseWrapper) => this.onSuccess(res.json, res.headers, 1)
    //     );
    // }
    //
    // /**
    //  * 分页成功方法，从header中拿到分页数据，body中拿到数据
    //  * @param data
    //  * @param headers
    //  */
    // private onSuccess(data, headers, flag: number) {
    //     this.totalCount = headers.get('X-Total-Count');
    //     if (flag === 0) {
    //         this.projectTypes = data;
    //     } else {
    //         this.projectTemplates = data;
    //     }
    // }
    //
    // /**
    //  * 修改
    //  */
    // public updateType(template: TemplateRef<any>, type: ProjectType) {
    //     const tempType = new ProjectType();
    //     tempType.id = type.id;
    //     tempType.projectTypeName = type.projectTypeName;
    //     this.addTypeForm.setValue(tempType);
    //     this.addTypeContentRef = this.modalService.show(template);
    // }
    //
    // /**
    //  * 展示弹窗
    //  */
    // public showAddTypeModel(template: TemplateRef<any>) {
    //     this.addTypeForm.reset();
    //     this.addTypeContentRef = this.modalService.show(template);
    // }
    // public OnSubmit(value: ProjectType) {
    //     if (value.id){
    //     //    更新
    //         this.protemplateService.updateType(value).subscribe((response) => this.onUpdateUserRoleSuccess(response));
    //     } else {
    //     //    增加
    //         this.protemplateService.addType(value).subscribe((response) => this.onUpdateUserRoleSuccess(response));
    //     }
    // }
    // /**
    //  * 删除项目逻辑
    //  * @param user
    //  * @param template
    //  */
    // onDeleteType(type: ProjectType, template: TemplateRef<any>) {
    //     this.typeId = type.id;
    //     this.confirmRef = this.modalService.show(template, {class: 'modal-sm'});
    // }
    //
    // confirmType(): void {
    //     this.protemplateService.deleteType(this.typeId).subscribe((response) => {
    //         this.pageType = 0;
    //         this.loadAll();
    //     });
    //     this.confirmRef.hide();
    // }
    //
    // declineType(): void {
    //     this.confirmRef.hide();
    // }
    // // /**
    // //  * 关闭弹出框
    // //  * @param modalName
    // //  */
    // closeModal(modalName) {
    //     if (modalName === 'addProjectType') {
    //         this.addTypeContentRef.hide();
    //     }
    // }
    // onUpdateUserRoleSuccess(response) {
    //     this.pageType = 0;
    //     this.loadAll();
    //     this.addTypeContentRef.hide();
    // }
    // /**
    //  * 项目模板类型分页事件
    //  * @param event
    //  */
    // pageChangedType(event: any): void {
    //     this.pageType = event.pageType - 1;
    //     this.itemsPerPage = event.itemsPerPage;
    //     this.loadAll();
    // }
    // /**
    //  * 项目模板分页事件
    //  * @param event
    //  */
    // pageChangedTemplate(event: any): void {
    //     this.pageTemplate = event.pageTemplate - 1;
    //     this.itemsPerPage = event.itemsPerPage;
    //     this.loadProTemplateAll(this.type);
    // }
    // toProjectTemplate(type: ProjectType) {
    //     this.pageTemplate = 0;
    //     this.type = type;
    //     this.loadProTemplateAll(type);
    // }
}
