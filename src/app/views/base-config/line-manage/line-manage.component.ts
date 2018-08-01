import {Component, OnInit, TemplateRef} from '@angular/core';
import { Principal } from '../../../../core/auth/principal.service';
import { ToastService } from '../../../../core/toast/toast.service';
import {ResponseWrapper} from '../../../../core/model/response-wrapper.model';
import {LineManagerService} from './line-manage.service';
import {LineBody, LineBodyAndProcessVM, LineProcess, Process} from './lineManage.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {ITEMS_PER_PAGE} from '../../../../core/constants/pagination.constants';

@Component({
    templateUrl: 'line-manage.component.html',
    styleUrls: ['./line-manage.component.scss'],
})
export class LineManageComponent implements OnInit {
    public addLineForm: FormGroup;
    public addLineBodyContentRef: BsModalRef;
    public updateLineBodyProcessContentRef: BsModalRef;
    public flag: Boolean = false;
    // 确认弹窗
    confirmRef: BsModalRef;
    public deleteId: any;
    // 分页
    currentSearch = '';  // 当前搜索过滤数据
    currentSearchName = '';
    itemsPerPage: any = ITEMS_PER_PAGE;
    itemsPerPage1: any = ITEMS_PER_PAGE;
    totalCount: any = 0;
    pageLine: any = 0;
    pageProcess: any = 0;
    public lineData: LineBody[];
    public processData: LineProcess[];
    public data: Process[];
    public lineId: any;
    constructor(
        private principal: Principal,
        public toast: ToastService,
        public fb: FormBuilder,
        private modalService: BsModalService,
        private lineMangeService: LineManagerService
    ) {
    }

    ngOnInit() {
        this.principal.identity().then((account) => {
            this.loadAll();
        });
        this.addLineForm = this.fb.group({
            name: [null, Validators.compose([Validators.required])],
            id: null
        });
    }


    loadAll() {
        this.lineMangeService.queryLines({
            query: this.currentSearch,
            page: this.pageLine,
            size: this.itemsPerPage
        }).subscribe(
            (res: ResponseWrapper) => this.onSuccess(res.json, res.headers, 0)
        );
    }
    loadProcessAll(id: any) {
        this.lineMangeService.queryProcess({
            query: id,
            page: this.pageProcess,
            size: this.itemsPerPage
        }).subscribe(
            (res: ResponseWrapper) => this.onSuccess(res.json, res.headers, 1)
        );
    }
    toProcess(line: LineBody) {
        this.lineId = line.id;
        this.pageProcess = 0;
        this.loadProcessAll(this.lineId);
    }
    /**
     * 分页成功方法，从header中拿到分页数据，body中拿到数据
     * @param data
     * @param headers
     */
    private onSuccess(data, headers, flag: any) {
        this.totalCount = headers.get('X-Total-Count');
        if (flag === 0) {
            this.lineData = data;
        } else if (flag === 1) {
            console.log(data);
            if (data.length > 1) {
               this.flag = true;
            }
            this.processData = data;
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
        this.pageLine = 0;
        this.loadAll();
    }
    onSearch1() {
        if (!this.currentSearchName) {
            return this.clear();
        }
        this.findAllProcess();
    }
    /**
     * 清空检索输入框
     */
    clear() {
        this.pageLine = 0;
        this.currentSearch = '';
        this.loadAll();
    }

    /**
     * 分页事件
     * @param event
     */
    pageChangedLine(event: any): void {
        this.pageLine = event.page - 1;
        this.itemsPerPage = event.itemsPerPage;
        this.loadAll();
    }
    pageChangedProcess(event: any): void {
        this.pageProcess = event.page - 1;
        this.itemsPerPage = event.itemsPerPage;
        this.loadProcessAll(this.lineId);
    }
    /**
     * 展示弹窗
     */
    public showAddLineBodyModel(template: TemplateRef<any>) {
        this.addLineForm.reset();
        this.addLineBodyContentRef = this.modalService.show(template);
    }

    public showUpdateLineBodyProcessModel(template: TemplateRef<any>) {
       if (this.lineId) {
          this.findAllProcess();
           this.updateLineBodyProcessContentRef = this.modalService.show(template);
       } else {
           this.toast.error('请先选择工艺流程！');
       }
    }
    findAllProcess() {
        const name = this.currentSearchName;
        this.lineMangeService.findAllProcess(name).subscribe((process) => {
            this.data = process;
        });
    }
    /**
     * 展示弹窗
     */
    public showUpdateLineBodyModel(line: LineBody, template: TemplateRef<any>) {
        const tempLine = new LineBody();
        tempLine.id = line.id;
        tempLine.name = line.name;
        this.addLineForm.setValue(tempLine);
        this.addLineBodyContentRef = this.modalService.show(template);
    }
    public OnSubmit(value: LineBody) {
        // this.lineMangeService.addLine(value).subscribe((response) => this.onAddLineSuccess(response));
        if (value.id){
            //    更新
            this.lineMangeService.updateLine(value).subscribe((response) => this.onAddLineSuccess(response));
        } else {
            //    增加
            this.lineMangeService.addLine(value).subscribe((response) => this.onAddLineSuccess(response));
        }
    }
    onAddLineSuccess(response) {
        this.pageLine = 0;
        this.loadAll();
        this.addLineBodyContentRef.hide();
    }
    onAddLineProcessSuccess(response, flag: any) {
       if (flag === 0) {
         return;
       } else {
           // this.pageProcess = 0;
           // this.loadProcessAll(this.lineId);
           // this.addLineBodyContentRef.hide();
       }
    }
    closeModal(modalName) {
        if (modalName === 'addLineBody') {
            this.addLineBodyContentRef.hide();
        }
        if (modalName === 'updateLineBodyProcess') {
            this.updateLineBodyProcessContentRef.hide();
        }
    }
    /**
     * 逻辑删除
     * @param line
     * @param template
     */
    onDeleteLine(line: LineBody, template: TemplateRef<any>) {
        this.deleteId = line.id;
        this.confirmRef = this.modalService.show(template, {class: 'modal-sm'});
    }
    confirm(): void {
        this.lineMangeService.deleteLine(this.deleteId).subscribe((response) => {
            this.pageLine = 0;
            this.loadAll();
        });
        this.confirmRef.hide();
    }

    decline(): void {
        this.confirmRef.hide();
    }
    updateSort(flag: any, process: LineProcess) {
        const tempProcessData = this.processData;
        const lineBody = process.lineBody;
        if (flag === 0) {
            const n = this.processData.length - 1;
           if (process.id === this.processData[n].id) {
               this.toast.error('操作有误！');
               return;
           }  else {
               for (let i = 0; i < this.processData.length; i++) {
                   if (process.id === this.processData[i].id) {
                       const tempData  = this.processData[i];
                       this.processData[i] = this.processData[i + 1];
                       this.processData[i + 1] = tempData;
                       break;
                   }
               }
           }

        }
        if (flag === 1) {
            if (process.sort === 1) {
                this.toast.error('操作有误！');
                return;
            } else {
                for (let i = 0; i < this.processData.length; i++) {
                    if (process.id === this.processData[i].id) {
                        const tempData  = this.processData[i];
                        this.processData[i] = this.processData[i - 1];
                        this.processData[i - 1] = tempData;
                        break;
                    }
                }
            }
        }
        const lineBodyAndProcessVM = new LineBodyAndProcessVM();
        lineBodyAndProcessVM.lineBody = lineBody;
        lineBodyAndProcessVM.lineProcesses = this.processData;
        this.updateLineProcess(lineBodyAndProcessVM);
    }
    updateLineProcess(lineBodyAndProcessVM) {
        this.lineMangeService.updateLineProcess(lineBodyAndProcessVM).subscribe((response) => this.onAddLineProcessSuccess(response, 0));
    }
    public updateLineBodyProcess() {
        // const userRoleList: Role[] = [];
        // this.roles.forEach(function(role) {
        //     if (role.checked) {
        //         userRoleList.push(role);
        //     }
        // });
        // this.currentUser.roles = userRoleList;
        // // 修改角色信息
        // this.userManageService.update(this.currentUser).subscribe((response) => this.onUpdateUserRoleSuccess(response));
    }
}
