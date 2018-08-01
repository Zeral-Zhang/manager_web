import { Component, OnInit, TemplateRef, ViewEncapsulation } from '@angular/core';
import { StaffManageService } from './staff-manage.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoleAndStaff, RoleListModel, Staff, TreeOfTree } from './staff-manage.model';
import { ToastrService } from 'ngx-toastr';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ResponseWrapper } from '../../../../core/model/response-wrapper.model';
import { ITEMS_PER_PAGE } from '../../../../core/constants/pagination.constants';
import { User } from '../../../../core/user/user.model';

@Component({
    selector: 'app-role-depart-steff',
    templateUrl: 'staff-manage.component.html',
    styleUrls: ['staff-manage.component.scss'],
    providers: [StaffManageService],
    encapsulation: ViewEncapsulation.None

})
export class StaffManageComponent implements OnInit {

    public userData: User[];
    itemsPerPage: any = 5;
    totalCount: any = 0;
    page: any = 0;

    public currentUser: User;
    public options = {};
    public nodes = []; // 树形结构数据
    public tr: TreeOfTree; // 选择后的树
    public roleContentRef: BsModalRef; // 角色管理弹出界面
    public addUserContentRef: BsModalRef; // 添加修改用户信息弹框
    public confirmRef: BsModalRef;  // 确认弹窗
    public treeRef: BsModalRef; //
    public addDepContentRef: BsModalRef; // 部门弹出界面
    public form: FormGroup; // 新增员工表单
    public form1: FormGroup; // 部门表单
    public treeData; // 后台返回的树数据
    public parentName: string; // 上级部门名称
    public parentId: number; // 上级部门ID
    public nowDepartId: number; // 上级部门ID
    public data: Staff []; // 员工列表数据
    public customs = [];
    public roleData: RoleListModel[];
    public staff: Staff;
    public sex = ['男', '女'];
    public position = ['部门主管', '员工'];


    constructor(private staffService: StaffManageService, private modalService: BsModalService, public fb: FormBuilder,
                private toast: ToastrService,
    ) {
        this.parentId = 0;

    }

    ngOnInit() {
        this.getDepData();
        /*-------新增员工表单------*/
        this.form = this.fb.group({
            staffId: null,
            staffCode: [null, Validators.compose([Validators.required, Validators.minLength(3)])],
            staffIdcard: null,
            staffMail: null,
            staffTel: null,
            staffPosition: null,
            staffSex: null,
            staffName: [null, Validators.compose([Validators.required])],
            departId: null,
            operUser: null,
            deleteStatus: null,
            createTime: null
        });
        /*----------新增部门------------------*/
        this.form1 = this.fb.group({
            name: [null, Validators.compose([Validators.required])],
            id: null
        });
    }

    // 获取树数据
    getDepData() {
        this.staffService.getData().then(res => {
            this.treeData = res;
            this.nodes = this.treeData;
        });
    }

    // 点击树节点，存储并查询员工
    onEvent(event) {
        this.page = 0;
        // 上级部门名称
        this.parentName = event.node.data.name;
        this.parentId = event.node.data.id;
        this.tr = new TreeOfTree();
        // 封装当前所选树数据
        this.tr.name = event.node.data.name;
        this.tr.id = event.node.data.id;
        this.data = [];
        this.customs = [];
        if (this.tr.id !== 0) {
            this.loadAll();
        }
    }

    // 点击树节点，用于更换员工部门
    onEvent1(event) {
        this.nowDepartId = event.node.data.id;
    }

    // 部门转换弹窗
    changeDep(template: TemplateRef<any>, userInfo: User) {
        this.currentUser = userInfo;
        this.treeRef = this.modalService.show(template);
    }

    // 取消更换部门
    decline1(): void {
        this.treeRef.hide();
    }

    // 更换部门
    changeDepSubmit() {
        if (this.nowDepartId) {
            this.currentUser.departmentId = this.nowDepartId;
            this.staffService.updateUserDepartment(this.currentUser).subscribe((response) => this.onOperatorUserSuccess1(response));
        } else {
            this.toast.error('请选择将要移动到的部门！');
        }
    }

    // 部门员工树的创建弹窗
    createDep(template: TemplateRef<any>, flag) {
        if (this.tr === null && flag === '1') {
            this.toast.error('请选择要编辑的部门');
        } else if (flag === '1' && this.tr.id === 0) {
            this.toast.error('不是部门，不能修改');
        } else {
            // 新增
            if (flag === '0') {
                this.form1.reset();
                this.tr = new TreeOfTree();
                this.tr = null;
            }
            if (flag === '1') {
                // 修改
                this.form1.setValue(this.tr);
            }
            this.addDepContentRef = this.modalService.show(template);
        }
    }


    // 保存部门数据
    public onSubmit1(value: TreeOfTree) {
        if (this.form1.valid) {
            if (value.id) {
                // 修改
                this.tr.name = value.name;
                this.staffService.updateDep(value).subscribe((response) => this.onSaveSuccess(response), () => this.onSaveError());
            } else {
                // 新增
                value.id = this.parentId;
                this.staffService.saveDep(value).subscribe((response) => this.onSaveSuccess(response), () => this.onSaveError());
            }
            this.addDepContentRef.hide();
        }
    }

    // 部门员工树的删除
    public deleteDep(template: TemplateRef<any>) {
        if (this.tr == null) {
            this.toast.error('请选择要删除的部门');
        } else {
            if (this.tr.id === 0) {
                this.toast.error('不是部门，不能删除！');
            } else if (this.userData != null && this.userData.length > 0) {
                this.toast.error('请先移除该部门下员工');
            } else {
                this.confirmRef = this.modalService.show(template, {class: 'modal-sm'});
            }
        }
    }


    // 部门树删除
    confirm1(): void {
        this.staffService.deleteDep(this.tr).subscribe((response) => {
            this.getDepData();
            this.confirmRef.hide();
        }, () => {
            this.getDepData();
            this.confirmRef.hide();
        });
    }

    /**
     * 加载用户列表
     */
    loadAll() {
        this.staffService.query({
            query: this.parentId,
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
        this.userData = data;
    }

    /**
     * 展示弹窗
     */
    public showAddUserModal(template: TemplateRef<any>) {
        if (this.tr == null) {
            alert('请选择部门');
            return;
        }
        this.currentUser = new User();
        this.addUserContentRef = this.modalService.show(template);
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
     * 添加/修改用户提交表单事件
     */
    public onSubmit() {
        // 用form表单中的userId来判断是添加用户还是修改用户的操作
        if (this.currentUser.id != null) {
            this.staffService.update(this.currentUser).subscribe((response) => this.onOperatorUserSuccess(response));
        } else {
            this.currentUser.departmentId = this.parentId;
            this.staffService.create(this.currentUser).subscribe((response) => this.onOperatorUserSuccess(response));
        }
    }

    /**
     * 操作用户成功
     * @param result
     */
    private onOperatorUserSuccess(result) {
        this.page = 0;
        this.loadAll();
        this.addUserContentRef.hide();
    }

    /**
     * 更换用户部门成功
     * @param result
     */
    private onOperatorUserSuccess1(result) {
        this.page = 0;
        this.loadAll();
        this.treeRef.hide();
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
        console.log(this.parentId);
        this.staffService.delete(this.currentUser.login).subscribe(() => {
            this.page = 0;
            this.loadAll();
            this.confirmRef.hide();
        });
    }

    decline(): void {
        this.confirmRef.hide();
    }


    // 保存部门成功后回调方法
    public onSaveSuccess(result) {
        this.getDepData();
    }

    // 保存部门失败后的回调方法
    public onSaveError() {
    }

    // 保存部门成功后回调方法
    public onSaveSuccess1(result) {
        this.page = 0;
        this.loadAll();
        this.addUserContentRef.hide();
    }

    // 保存部门失败后的回调方法
    public onSaveError1() {
        this.addUserContentRef.hide();
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

// 关闭弹出框

    closeModal(modalName) {
        if (modalName === 'roleContent') {
            this.roleContentRef.hide();
        } else if (modalName === 'addUserContentRef') {
            this.page = 0;
            this.loadAll();
            this.addUserContentRef.hide();
        } else if (modalName === 'addDepContent') {
            this.addDepContentRef.hide();
        }
    }


    selectedAll(roleData) {
        console.log(roleData);
        this.roleData.forEach(function (role) {
            if (role.checked) {
                role.checked = false;
            } else {
                role.checked = true;
            }
        });
    }


    selectedOne(role) {
        console.log(role);
        if (role.checked) {
            role.checked = false;
        } else {
            role.checked = true;
        }
    }

}
