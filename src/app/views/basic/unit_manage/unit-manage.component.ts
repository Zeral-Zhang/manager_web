import { Component, TemplateRef } from '@angular/core';
import { Principal } from '../../../../core/auth/principal.service';
import { JhiEventManager } from 'ng-jhipster';
import { FormBuilder } from '@angular/forms';
import { ToastService } from '../../../../core/toast/toast.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { UnitManageService } from './unit-manage.service';
import { ITEMS_PER_PAGE } from '../../../../core/constants/pagination.constants';
import { Units } from './unit-manage.model';
import { ResponseWrapper } from '../../../../core/model/response-wrapper.model';


@Component({
  selector: 'app-config-role-list',
  templateUrl: './unit-manage.component.html',
  styleUrls: ['./unit-manage.component.scss'],
  providers: [],
})
export class UnitManageComponent {
    public unitData: Units[]; // 列表数据
    itemsPerPage: any = ITEMS_PER_PAGE; // 分页数量
    totalCount: any = 0; // 总数量
    page: any = 0; // 当前页数
    public currentUnit: Units; // 当前选中单位
    currentSearch = '';  // 当前搜索过滤数据
    public addUnitContentRef: BsModalRef; // 添加修改用户信息弹框
    public confirmRef: BsModalRef;  // 确认弹窗

  constructor( private principal: Principal,
               private eventManager: JhiEventManager,
               public unitManageService: UnitManageService,
               private modalService: BsModalService,
               public fb: FormBuilder,
               public toast: ToastService) {
      this.principal.identity().then((account) => {
          this.loadAll();
      });
  }


    loadAll() {
        this.unitManageService.query({
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
        this.unitData = data;
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
     * @param unitInfo 单位信息
     */
    public updateUnit(template: TemplateRef<any>, unitInfo: Units) {
        this.currentUnit = Object.assign(new Units(), unitInfo);
        this.addUnitContentRef = this.modalService.show(template);
    }

    /**
     * 展示弹窗
     */
    public showAddUnitModal(template: TemplateRef<any>) {
        this.currentUnit = new Units();
        this.addUnitContentRef = this.modalService.show(template);
    }

    /**
     * 添加/修改用户提交表单事件
     */
    public onSubmit() {
        // 用form表单中的Id来判断是添加还是修改的操作
        if (this.currentUnit.id != null) {
            this.unitManageService.update(this.currentUnit).subscribe((response) => this.onOperatorUnitSuccess(response));
        } else {
            this.unitManageService.create(this.currentUnit).subscribe((response) => this.onOperatorUnitSuccess(response));
        }
    }

    /**
     * 操作成功
     * @param result
     */
    private onOperatorUnitSuccess(result) {
        this.page = 0;
        this.loadAll();
        this.addUnitContentRef.hide();
    }

    /**
     * 删除弹窗
     * @param template
     */
    onDeleteConfirm(unit, template: TemplateRef<any>) {
        this.currentUnit = unit;
        this.confirmRef = this.modalService.show(template, {class: 'modal-sm'});
    }

    /***
     * 删除逻辑
     */
    confirm(): void {
        this.unitManageService.delete(this.currentUnit.id).subscribe(() => {
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
      if (modalName === 'addUnitContentRef') {
            this.addUnitContentRef.hide();
        } else if (modalName === 'confirmTemplate') {
            this.confirmRef.hide();
        }
    }

}

