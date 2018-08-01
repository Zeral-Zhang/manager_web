import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { JhiEventManager } from 'ng-jhipster';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ITEMS_PER_PAGE } from '../../../../core/constants/pagination.constants';
import { ToastService } from '../../../../core/toast/toast.service';
import { Principal } from '../../../../core/auth/principal.service';
import { InventoryListService } from './inventory-list.service';
import { ResponseWrapper } from '../../../../core/model/response-wrapper.model';
import { Inventory, Project } from './inventoryList.model';

@Component({
    templateUrl: 'inventory-list.component.html',
    styleUrls: ['./inventory-list.component.scss'],
})
export class InventoryListComponent implements OnInit {
    public projects: Project[];
    public inventories: Inventory[];
    // 分页
    itemsPerPage: any = ITEMS_PER_PAGE;
    currentSearch = '';  // 当前搜索过滤数据
    totalCount: any = 0;
    page: any = 0;
    pageInventory: any = 0;
    currentProSearch: any = '';
    currentVenSearch: any = '';
    public states: any;
    public id: number;
    // 确认弹窗
    confirmRef: BsModalRef;

    public form: FormGroup; // 新增用户表单

    constructor(
        private principal: Principal,
        private inventoryListService: InventoryListService,
        private eventManager: JhiEventManager,
        private modalService: BsModalService,
        public fb: FormBuilder,
        public toast: ToastService
    ) {
    }

    ngOnInit() {
        this.principal.identity().then((account) => {
            this.loadAll();
        });
        // this.addTypeForm = this.fb.group({
        //     projectTypeName: [null, Validators.compose([Validators.required])],
        //     id: null
        // });
    }
    loadAll() {
        this.inventoryListService.queryProjects({
            query: this.currentProSearch,
            page: this.page,
            size: this.itemsPerPage
        }).subscribe(
            (res: ResponseWrapper) => this.onSuccess(res.json, res.headers, 0)
        );
    }

    loadInventoryAll() {
        const query = this.id + '!' + this.states + '!' + this.currentVenSearch;
        this.inventoryListService.queryInventory({
            query: query,
            page: this.pageInventory,
            size: this.itemsPerPage
        }).subscribe(
            (res: ResponseWrapper) => this.onSuccess(res.json, res.headers, 1)
        );
    }

    private onSuccess(data, headers, flag: number) {
        this.totalCount = headers.get('X-Total-Count');
        if (flag === 0) {
            this.projects = data;
            this.id = data[0] && data[0].id;
            if (data[0]) {
                this.getInventories(data[0]);
            }
        } else {
            this.inventories = data;
        }
    }

    pageChangedProject(event: any): void {
        this.page = event.page - 1;
        this.itemsPerPage = event.itemsPerPage;
        this.loadAll();
    }

    pageChangedInventory(event: any): void {
        this.pageInventory = event.page - 1;
        this.itemsPerPage = event.itemsPerPage;
        this.loadInventoryAll();
    }
    getInventories(project: Project) {
        this.states = 'undefined';
        this.id = project.id;
        this.pageInventory = 0;
        this.loadInventoryAll();
    }
    getVensByStatue (value: number) {
      if (this.id) {
          this.clear(1);
          this.states = value;
          this.pageInventory = 0;
          this.loadInventoryAll();
      } else {
          this.toast.error('请先选择项目！');
      }
    }
    onSearch() {
        if (!this.currentProSearch) {
            return this.clear(0);
        }
        this.page = 0;
        this.loadAll();
    }
    onSearch1() {
        if (!this.currentVenSearch) {
            return this.clear(1);
        }
        this.pageInventory = 0;
        this.loadInventoryAll();
    }
    clear(value) {
       if (value === 0) {
           this.page = 0;
           this.currentProSearch = '';
           this.loadAll();
       } else {
           this.pageInventory = 0;
           this.currentVenSearch = '';
           this.loadInventoryAll();
       }
    }
    // toProjectTemplate(type: ProjectType) {
    //     this.pageTemplate = 0;
    //     this.type = type;
    //     this.loadProTemplateAll(type);
    // }
}
