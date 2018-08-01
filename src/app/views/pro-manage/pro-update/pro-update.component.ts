import { Component, OnInit} from '@angular/core';
import { ITEMS_PER_PAGE } from '../../../../core/constants/pagination.constants';
import { Principal } from '../../../../core/auth/principal.service';
import { ToastService } from '../../../../core/toast/toast.service';
import {ProUpdateService} from './pro-update.service';
import {Project} from '../proList.model';
import {ProListService} from '../pro-list/pro-list.service';
import {ResponseWrapper} from '../../../../core/model/response-wrapper.model';

@Component({
    templateUrl: 'pro-update.component.html',
    styleUrls: ['./pro-update.component.scss'],
})
export class ProUpdateComponent implements OnInit {
    public proListData: Project;
    // 分页
    currentSearch = '';  // 当前搜索过滤数据
    itemsPerPage: any = ITEMS_PER_PAGE;
    totalCount: any = 0;
    page: any = 0;
    constructor(
        private principal: Principal,
        public toast: ToastService,
        public proListService: ProListService,
        public proUpdateService: ProUpdateService
    ) {
    }

    ngOnInit() {
        this.principal.identity().then((account) => {
            this.loadAll();
        });

    }


    loadAll() {
        this.proListService.query({
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
        this.proListData = data;
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
    deleteItem(i) {

    }
}
