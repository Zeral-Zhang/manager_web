import { Component, OnInit, TemplateRef } from '@angular/core';
import { ResponseWrapper } from '../../../../core/model/response-wrapper.model';
import { ITEMS_PER_PAGE } from '../../../../core/constants/pagination.constants';
import { RoleService } from './role.service';
import { Role } from '../../../../core/user/role.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { JhiEventManager } from 'ng-jhipster';
import { ToastService } from '../../../../core/toast/toast.service';
import { TreeviewConfig, TreeviewItem } from 'ngx-treeview';
import { Tree } from '../../../../core/model/tree.model';
import { RoleMenus } from './roleManage.model';


@Component({
    selector: 'app-config-role-list',
    templateUrl: './role-manage.component.html',
    styleUrls: ['./role-manage.component.scss'],
})
export class RoleManageComponent implements OnInit {
    public roleData: Role[];
    public code: string;
    itemsPerPage: any = ITEMS_PER_PAGE;
    currentSearch = '';  // 当前搜索过滤数据
    totalCount: any = 0;
    page: any = 0;

    public addRoleData: Role;
    public updateRoleDta: Role;
    // 添加修改角色信息弹框
    addRoleContentRef: BsModalRef;
    updateRoleContentRef: BsModalRef;
    // 菜单树
    roleManContentRef: BsModalRef;
    public treeItems: TreeviewItem[];
    items: TreeviewItem[];
    values: string[];
    config = TreeviewConfig.create({
        hasAllCheckBox: true,
        hasFilter: true,
        hasCollapseExpand: true,
        decoupleChildFromParent: false,
        maxHeight: 400
    });
    // 查看角色信息弹框
    // roleContentRef: BsModalRef;
    // 确认弹窗
    confirmRef: BsModalRef;

    constructor(private roleService: RoleService, private modalService: BsModalService,
                public toast: ToastService,
                private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.loadAll();
    }

    /**
     * 加载角色列表
     */
    loadAll() {
        this.roleService.query({
            query: this.currentSearch,
            page: this.page,
            size: this.itemsPerPage
        }).subscribe(
            (res: ResponseWrapper) => this.onSuccess(res.json, res.headers)
        );
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
     * 分页成功方法，从header中拿到分页数据，body中拿到数据
     * @param data
     * @param headers
     */
    private onSuccess(data, headers) {
        this.page = 0;
        this.totalCount = headers.get('X-Total-Count');
        this.roleData = data;
    }

    /**
     * 展示弹窗
     */
    public showAddRoleModal(template: TemplateRef<any>) {
        this.addRoleData = new Role();
        this.addRoleContentRef = this.modalService.show(template);
    }

    public showUpdateRoleModal(role: Role, template: TemplateRef<any>) {
        this.updateRoleDta = Object.assign(new Role(), role);
        this.updateRoleContentRef = this.modalService.show(template);
    }

    /**
     * 添加/删除用户提交表单事件
     */
    public addRoleOnSubmit() {
        this.roleService.create(this.addRoleData).subscribe((response) => this.onSaveSuccess(response), () => this.onSaveError());
    }

    updateOnSubmit() {
        this.roleService.update(this.updateRoleDta).subscribe((response) => this.onSaveSuccess1(response), () => this.onSaveError());
    }

    onDeleteConfirm(code, template: TemplateRef<any>) {
        this.code = code;
        this.confirmRef = this.modalService.show(template, {class: 'modal-sm'});
    }

    confirm(): void {
        this.roleService.delete(this.code).subscribe(() => {
            this.page = 0;
            this.currentSearch = '';
            this.loadAll();
        });
        this.confirmRef.hide();
    }

    decline(): void {
        this.confirmRef.hide();
    }

    toMenus(code, template: TemplateRef<any>) {
        this.code = code;
        this.roleService.findMenus(code).subscribe((res) => {
            this.treeItems = new Array<TreeviewItem>();
            res.forEach((data: Tree) => {
                this.treeItems.push(new TreeviewItem(data));
            });
            this.items = this.treeItems;
            this.openMenus(template);
        });
    }

    openMenus(template: TemplateRef<any>) {
        this.roleManContentRef = this.modalService.show(template);
    }

    updateRoleMenus() {
        const roleMenu = new RoleMenus();
        roleMenu.code = this.code;
        const ids = [];
        this.values.forEach((value) => {
            const data = parseInt(value);
            ids.push(data);
        });
        roleMenu.menuId = ids;
        this.roleService.updateRoleMenus(roleMenu).subscribe((response) => this.onSaveSuccess2(response), () => this.onSaveError());
    }

    /**
     * 关闭弹出框
     * @param modalName
     */
    closeModal(modalName) {
        if (modalName === 'addRole') {
            this.addRoleContentRef.hide();
        } else if (modalName === 'updateRole') {
            this.updateRoleContentRef.hide();
        } else if (modalName === 'roleContent') {
            this.roleManContentRef.hide();
        }
    }

    private onSaveSuccess(result) {
        this.page = 0;
        this.currentSearch = '';
        this.loadAll();
        this.addRoleContentRef.hide();
    }

    private onSaveSuccess1(result) {
        this.page = 0;
        this.currentSearch = '';
        this.loadAll();
        this.updateRoleContentRef.hide();
    }

    private onSaveSuccess2(result) {
        this.page = 0;
        this.currentSearch = '';
        this.loadAll();
        this.roleManContentRef.hide();
    }

    private onSaveError() {

    }
}

