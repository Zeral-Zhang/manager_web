import { Component, OnInit} from '@angular/core';
import { ITEMS_PER_PAGE } from '../../../../core/constants/pagination.constants';
import { Principal } from '../../../../core/auth/principal.service';
import { ToastService } from '../../../../core/toast/toast.service';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Department, Participant, ProjectDetail} from './proInfo.model';
import {ProInfoService} from './pro-info.service';
import {DatePipe} from '@angular/common';
import {forEach} from '@angular/router/src/utils/collection';

@Component({
    templateUrl: 'pro-info.component.html',
    styleUrls: ['./pro-info.component.scss'],
})
export class ProInfoComponent implements OnInit {
    public form: FormGroup;
    public data: any;
    public percentData: any;
    public project: ProjectDetail;
    public users: any;

    constructor(private principal: Principal,
                private route: ActivatedRoute,
                private datePipe: DatePipe,
                private proInfoService: ProInfoService,
                public fb: FormBuilder,
                public toast: ToastService) {
    }

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            this.data = params['id'];
            this.percentData = params['percent'] + '%';
            console.log(this.data);
            this.principal.identity().then((account) => {
                this.loadAll();
            });
        });
        this.form = this.fb.group({
            id: null,
            name: null,
            simpleName: null,
            planName: null,
            des: null,
            workPlanName: null,
            createTime: null,
            state: null,
            proPlanId: null,
            startTime: null,
            deleteStatue: null,
            percent: null,
            projectPlan: null,
            principalView: null,
            principal: null,
            user: null,
            participants: null,
        });
    }


    loadAll() {
        this.proInfoService.find(this.data).subscribe(
            (response) => this.onSuccess(response), () => this.onError()
        );
    }

    private onSuccess(result) {
        this.project = result;
        const createTime = this.datePipe.transform(this.project.createTime, 'yyyy-MM-dd HH:mm:ss');
        this.project.createTime = createTime;
        const startTime = this.datePipe.transform(this.project.startTime, 'yyyy-MM-dd HH:mm:ss');
        this.project.startTime = startTime;
        if (this.project.state === 0) {
            const tempState = '进行中';
            this.project.state = tempState;
        } else  if (this.project.state === 1) {
            const tempState = '延期';
            this.project.state = tempState;
        } else  if (this.project.state === 2) {
            const tempState = '已完成';
            this.project.state = tempState;
        }
        this.users = this.project.participants;
        this.project.percent = this.percentData;
        this.form.setValue(this.project);
    }

    private onError() {
    }
}
