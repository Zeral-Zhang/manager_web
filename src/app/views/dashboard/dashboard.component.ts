import { Component, OnInit } from '@angular/core';
import {ResponseWrapper} from '../../../core/model/response-wrapper.model';
import {BsModalService} from 'ngx-bootstrap';
import {Principal} from '../../../core/auth/principal.service';
import {JhiEventManager} from 'ng-jhipster';
import {ToastService} from '../../../core/toast/toast.service';
import {DashboardService} from './dashboard.service';
import {Plan, Project} from './dashboard.model';
import {Router} from '@angular/router';

@Component({
    templateUrl: 'dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
    public flag: boolean;

    // 全屏按钮功能参数
    public a: any;
    public b: any;
    public c: any;
    // 全屏按钮功能参数

    itemsPerPage: any = 5;
    totalCount: any = 0;
    page: any = 0;
    public projectsData: Project [];
    public falseEventData: Plan [];
    public successEventData: Plan [];
    // lineChart
    // public lineChartData: Array<any> = [
    //     {data: [1, 2, 3, 3, 1, 1, 2, 1, 3, 3, 3, 2], label: '新建项目数量'},
    // ];
    // public lineChartLabels: Array<any> = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
    // public lineChartOptions: any = {
    //     animation: false,
    //     responsive: true
    // };
    // public lineChartColours: Array<any> = [
    //     { // grey
    //         backgroundColor: 'rgba(148,159,177,0.2)',
    //         borderColor: 'rgba(148,159,177,1)',
    //         pointBackgroundColor: 'rgba(148,159,177,1)',
    //         pointBorderColor: '#fff',
    //         pointHoverBackgroundColor: '#fff',
    //         pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    //     },
    //     { // dark grey
    //         backgroundColor: 'rgba(77,83,96,0.2)',
    //         borderColor: 'rgba(77,83,96,1)',
    //         pointBackgroundColor: 'rgba(77,83,96,1)',
    //         pointBorderColor: '#fff',
    //         pointHoverBackgroundColor: '#fff',
    //         pointHoverBorderColor: 'rgba(77,83,96,1)'
    //     },
    //     { // grey
    //         backgroundColor: 'rgba(148,159,177,0.2)',
    //         borderColor: 'rgba(148,159,177,1)',
    //         pointBackgroundColor: 'rgba(148,159,177,1)',
    //         pointBorderColor: '#fff',
    //         pointHoverBackgroundColor: '#fff',
    //         pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    //     }
    // ];
    // public lineChartLegend = true;
    // public lineChartType = 'line';
    //
    //
    // // Doughnut
    // public doughnutChartLabels: string[] = ['项目部', '生产部', '采购部', '现场安装'];
    // public doughnutChartData: number[] = [10, 30, 30, 30];
    // public doughnutChartType = 'doughnut';
    //
    // // Pie
    // public pieChartLabels: string[] = ['资料收集中', '安装中', '已完成'];
    // public pieChartData: number[] = [5, 5, 10];
    // public pieChartType = 'pie';
    //
    // // events
    // public chartClicked(e: any): void {
    //     console.log(e);
    // }
    //
    // public chartHovered(e: any): void {
    //     console.log(e);
    // }
    constructor(
        private principal: Principal,
        private router: Router,
        private dashboardService: DashboardService,
        private eventManager: JhiEventManager,
        private modalService: BsModalService,
        public toast: ToastService
    ) {
    }
    ngOnInit(): void {
        this.flag = false;
        this.principal.identity().then((account) => {
            this.loadAll();
            this.loadAllFalseEvent();
            this.loadAllSuccessEvent();
        });
    }

    loadAll() {
        this.dashboardService.query({
            query: '',
            page: this.page,
            size: this.itemsPerPage
        }).subscribe(
            (res: ResponseWrapper) => this.onSuccess(res.json, res.headers)
        );
    }
    loadAllFalseEvent() {
        this.dashboardService.queryFalseEvent({
            query: '',
            page: this.page,
            size: this.itemsPerPage
        }).subscribe(
            (res: ResponseWrapper) => this.onSuccess1(res.json, res.headers)
        );
    }
    loadAllSuccessEvent() {
        this.dashboardService.querySuccessEvent({
            query: '',
            page: this.page,
            size: this.itemsPerPage
        }).subscribe(
            (res: ResponseWrapper) => this.onSuccess2(res.json, res.headers)
        );
    }
    private onSuccess(data, headers) {
        this.page = 0;
        this.totalCount = headers.get('X-Total-Count');
        this.projectsData = data;
    }
    private onSuccess1(data, headers) {
        this.page = 0;
        this.totalCount = headers.get('X-Total-Count');
        this.falseEventData = data;
    }
    private onSuccess2(data, headers) {
        this.page = 0;
        this.totalCount = headers.get('X-Total-Count');
        this.successEventData = data;
    }

    // 开启全屏
    fullScan() {
        if (!this.hasClass(document.querySelector('body'), 'sidebar-hidden')) {
            document.querySelector('body').classList.add('sidebar-hidden');
        }
        this.c = document.getElementsByClassName('app-body');
        this.c[0].style.marginTop = '5px';
        this.b = document.querySelector('header');
        this.b.style.top = '-100px';
        this.flag = true;
    }

    // 关闭全屏
    closeFull() {
        document.querySelector('body').classList.remove('sidebar-hidden');
        this.c = document.getElementsByClassName('app-body');
        this.c[0].style.marginTop = '55px';
        this.b = document.querySelector('header');
        this.b.style.top = '0px';
        this.flag = false;
    }

    private hasClass(target: any, elementClassName: string) {
        return new RegExp('(\\s|^)' + elementClassName + '(\\s|$)').test(target.className);
    }
}
