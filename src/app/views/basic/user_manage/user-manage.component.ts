import { Component, OnInit, TemplateRef } from '@angular/core';
import { UserManageService } from './user-manage.service';
import { ITEMS_PER_PAGE } from '../../../../core/constants/pagination.constants';
import { Principal } from '../../../../core/auth/principal.service';
import { JhiEventManager } from 'ng-jhipster';
import { ResponseWrapper } from '../../../../core/model/response-wrapper.model';
import { ToastService } from '../../../../core/toast/toast.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { User } from '../../../../core/user/user.model';
import { Role } from '../../../../core/user/role.model';
import { RoleService } from '../role_manage/role.service';

@Component({
    templateUrl: 'user-manage.component.html',
    styleUrls: ['./user-manage.component.scss'],
})
export class UserManageComponent implements OnInit {
    // 分页
    public userData: User[];
    itemsPerPage: any = ITEMS_PER_PAGE;
    currentSearch = '';  // 当前搜索过滤数据
    totalCount: any = 0;
    page: any = 0;

    public currentUser: User;
    // 角色
    public roles: Role[];
    // 添加修改用户信息弹框
    addUserContentRef: BsModalRef;
    // 查看角色信息弹框
    roleContentRef: BsModalRef;
    // 确认弹窗
    confirmRef: BsModalRef;

    constructor(private principal: Principal,
                private eventManager: JhiEventManager,
                public userManageService: UserManageService,
                public roleService: RoleService,
                private modalService: BsModalService,
                public toast: ToastService) {
    }

    ngOnInit() {
        this.principal.identity().then((account) => {
            this.loadAll();
        });
        // 查询所有角色
        this.roleService.findAll().subscribe((roles) => {
            this.roles = roles;
        });
    }

    /**
     * 加载用户列表
     */
    loadAll() {
        this.userManageService.query({
            query: this.currentSearch,
            page: this.page,
            size: this.itemsPerPage
        }).subscribe(
            (res: ResponseWrapper) => this.onSuccess(res.json, res.headers)
        );
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
     * 分页成功方法，从header中拿到分页数据，body中拿到数据
     * @param data
     * @param headers
     */
    private onSuccess(data, headers) {
        this.totalCount = headers.get('X-Total-Count');
        this.userData = data;
    }

    /**
     * 修改用户信息
     * @param template 模板
     * @param userInfo 用户信息
     */
    public updateUser(template: TemplateRef<any>, userInfo: User) {
        this.currentUser = Object.assign(new User(), userInfo);
        this.addUserContentRef = this.modalService.show(template);
    }

    /**
     * 展示弹窗
     */
    public showAddUserModal(template: TemplateRef<any>) {
        this.currentUser = new User();
        this.addUserContentRef = this.modalService.show(template);
    }

    /**
     * 添加/修改用户提交表单事件
     */
    public onSubmit() {
        // 用form表单中的userId来判断是添加用户还是修改用户的操作
        if (this.currentUser.id != null) {
            this.userManageService.update(this.currentUser).subscribe((response) => this.onOperatorUserSuccess(response));
        } else {
            this.userManageService.create(this.currentUser).subscribe((response) => this.onOperatorUserSuccess(response));
        }
    }

    /**
     * 操作用户成功
     * @param result
     */
    private onOperatorUserSuccess(result) {
        this.loadAll();
        this.addUserContentRef.hide();
    }

    /**
     * 获取用户角色信息
     * @param user
     * @param template
     */
    getRole(user: User, template: TemplateRef<any>) {
        this.currentUser = user;
        const userRoleCodes = user.roles.map(role => role.code);
        for (const role of this.roles) {
            role.checked = userRoleCodes.includes(role.code);
        }
        this.roleContentRef = this.modalService.show(template);
    }

    /**
     * 更新用户信息
     */
    public updateUserRoleInfo() {
        const userRoleList: Role[] = [];
        this.roles.forEach(function(role) {
            if (role.checked) {
                userRoleList.push(role);
            }
        });
        this.currentUser.roles = userRoleList;
        // 修改角色信息
        this.userManageService.update(this.currentUser).subscribe((response) => this.onUpdateUserRoleSuccess(response));
    }

    /**
     * 更新用户角色成功
     * @param response
     */
    onUpdateUserRoleSuccess(response) {
        this.loadAll();
        this.roleContentRef.hide();
    }

    /**
     * 删除用户逻辑
     * @param user 用户
     * @param template
     */
    onDeleteConfirm(user, template: TemplateRef<any>) {
        this.currentUser = user;
        this.confirmRef = this.modalService.show(template, {class: 'modal-sm'});
    }

    confirm(): void {
        this.userManageService.delete(this.currentUser.login).subscribe(() => {
            this.confirmRef.hide();
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
        if (modalName === 'addUserContent') {
            this.addUserContentRef.hide();
        } else if (modalName === 'roleContent') {
            this.roleContentRef.hide();
        } else if (modalName === 'confirmTemplate') {
            this.confirmRef.hide();
        }
    }
}
