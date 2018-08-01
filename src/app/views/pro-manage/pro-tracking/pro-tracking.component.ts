import { Component, OnInit} from '@angular/core';
import { ITEMS_PER_PAGE } from '../../../../core/constants/pagination.constants';
import { Principal } from '../../../../core/auth/principal.service';
import { ToastService } from '../../../../core/toast/toast.service';
import {ProTrackingService} from './pro-tracking.service';
import {DepartmentManageService} from '../../basic/department-manage/department-manage.service';
import {Department} from '../pro-info/proInfo.model';
import {ResponseWrapper} from '../../../../core/model/response-wrapper.model';
import {ActivatedRoute} from '@angular/router';
import {Plan} from './proTracking.model';

@Component({
    templateUrl: 'pro-tracking.component.html',
    styleUrls: ['./pro-tracking.create.scss'],
})
export class ProTrackingComponent implements OnInit {
    public proName: string;
    public n: any = 0;
    public projectId: any;
    public depId: any;
    public depData: Department[];
    public successPlanData: Plan[];
    public falsePlanData: Plan[];
    itemsPerPage: any = ITEMS_PER_PAGE;
    totalCount: any = 0;
    pageDep: any = 0;
    pageSuccess: any = 0;
    pageFalse: any = 0;
    constructor(
        private principal: Principal,
        private route: ActivatedRoute,
        public toast: ToastService,
        public proTrackingService: ProTrackingService,
        public departmentService: DepartmentManageService
    ) {
    }

    ngOnInit() {
        this.principal.identity().then((account) => {
            this.loadDepartmentAll();
        });
        this.route.queryParams.subscribe(params => {
            this.projectId = params['id'];
            this.proName = params['simpleName'];
        });
    }


    loadDepartmentAll() {
        this.departmentService.query({
            page: this.pageDep,
            size: this.itemsPerPage
        }).subscribe(
            (res: ResponseWrapper) => this.onSuccess(res.json, res.headers, 0)
        );
    }
    loadPlanAll() {
        const query = this.depId + '!' + this.projectId;
        if (this.n === 1) {
            this.proTrackingService.queryFalsePlan({
                query: query,
                page: this.pageFalse,
                size: this.itemsPerPage
            }).subscribe(
                (res: ResponseWrapper) => this.onSuccess(res.json, res.headers, 1)
            );
        } else if (this.n === 2) {
            this.proTrackingService.querySuccessPlan({
                query: query,
                page: this.pageSuccess,
                size: this.itemsPerPage
            }).subscribe(
                (res: ResponseWrapper) => this.onSuccess(res.json, res.headers, 2)
            );
        }

    }

    /**
     * 分页成功方法，从header中拿到分页数据，body中拿到数据
     * @param data
     * @param headers
     */
    private onSuccess(data, headers, flag: any) {
        this.totalCount = headers.get('X-Total-Count');
        if (flag === 0) {
            this.depData = data;
        } else  if (flag === 1) {
            this.falsePlanData = data;
        } else  if (flag === 2) {
            this.successPlanData = data;
        }
    }


    /**
     * 分页事件
     * @param event
     */
    depPageChange(event: any): void {
        this.pageDep = event.page - 1;
        this.itemsPerPage = event.itemsPerPage;
        this.loadDepartmentAll();
    }
    pageFalseChanged(event: any): void {
        this.pageFalse = event.page - 1;
        this.itemsPerPage = event.itemsPerPage;
        this.loadPlanAll();
    }
    pageSuccessChanged(event: any): void {
        this.pageSuccess = event.page - 1;
        this.itemsPerPage = event.itemsPerPage;
        this.loadPlanAll();
    }
    toPlan(n) {
        this.pageFalse = 0;
        this.pageSuccess = 0;
      if (this.depId) {
          this.n = n;
          this.loadPlanAll();
      } else {
          this.toast.error('请先选择部门！');
      }
    }
    selectedDep(value: Department, n) {
        this.n = n;
        this.depId = value.id;
        this.pageFalse = 0;
        this.pageSuccess = 0;
    }
}
