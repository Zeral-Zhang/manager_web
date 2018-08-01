import { Component, OnInit} from '@angular/core';
import {Principal} from '../../../core/auth/principal.service';
import {ITEMS_PER_PAGE} from '../../../core/constants/pagination.constants';
import {ToastService} from '../../../core/toast/toast.service';
import {Event} from './eventList.model';
import {ResponseWrapper} from '../../../core/model/response-wrapper.model';
import {EventListService} from './eventList.service';
import {ActivatedRoute} from '@angular/router';

@Component({
    templateUrl: 'event-list.component.html',
    styleUrls: ['./event-list.component.scss'],
})
export class EventListComponent implements OnInit {
    public flag: number;
    // 分页
    itemsPerPage: any = ITEMS_PER_PAGE;
    totalCount: any = 0;
    fPage: any = 0;
    sPage: any = 0;

    public falseEventData: Event [];
    public successEventData: Event [];
    constructor(
        private principal: Principal,
        private route: ActivatedRoute,
        public toast: ToastService,
        private eventListService: EventListService
    ) {
    }

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
             this.flag  = parseInt(params['flag'].toString(), 2);
            this.principal.identity().then((account) => {
                if (this.flag === 1) {
                    this.loadAllSuccessEvent();
                } else if (this.flag === 0) {
                    this.loadAllFalseEvent();
                }
            });
        });

    }
    loadAllFalseEvent() {
        this.eventListService.queryFalseEvent({
            query: '',
            page: this.fPage,
            size: this.itemsPerPage
        }).subscribe(
            (res: ResponseWrapper) => this.onSuccess1(res.json, res.headers)
        );
    }
    loadAllSuccessEvent() {
        this.eventListService.querySuccessEvent({
            query: '',
            page: this.sPage,
            size: this.itemsPerPage
        }).subscribe(
            (res: ResponseWrapper) => this.onSuccess2(res.json, res.headers)
        );
    }
    private onSuccess1(data, headers) {
        this.totalCount = headers.get('X-Total-Count');
        this.falseEventData = data;
    }
    private onSuccess2(data, headers) {
        this.totalCount = headers.get('X-Total-Count');
        this.successEventData = data;
    }


    /**
     * 分页事件
     * @param event
     */
    sPageChanged(event: any): void {
        this.sPage = event.page - 1;
        this.itemsPerPage = event.itemsPerPage;
        this.loadAllSuccessEvent();
    }
    fPageChanged(event: any): void {
        this.fPage = event.page - 1;
        this.itemsPerPage = event.itemsPerPage;
        this.loadAllFalseEvent();
    }
}
