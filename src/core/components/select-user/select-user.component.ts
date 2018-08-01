import { Component, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { TreeviewConfig, TreeviewItem } from 'ngx-treeview';
import { SelectUserService } from './select-user.service';

@Component({
    selector: 'app-select-user',
    templateUrl: './select-user.component.html',
    styleUrls: ['./select-user.component.scss'],
    providers: [SelectUserService],
    encapsulation: ViewEncapsulation.None
})
export class SelectUserComponent implements OnInit {

    items: TreeviewItem[] = [];
    partmentUsers = [];
    selectUsers = [];
    @Output() selectedChange = new EventEmitter<any[]>();
    config = TreeviewConfig.create({
        hasAllCheckBox: true,
        hasFilter: true,
        hasCollapseExpand: true,
        decoupleChildFromParent: false,
        maxHeight: 400
    });

    constructor(private service: SelectUserService) {
    }

    ngOnInit() {
        this.service.getDepartment().subscribe(data => {
            for (const item of data) {
                this.items.push(new TreeviewItem(item));
            }
        });
    }


    onSelectedChange(selectedUsers) {
        this.partmentUsers = [];

        if (selectedUsers.length > 0) {
            for (const selectUser of selectedUsers) {

                this.service.queryDepartmentUsers(selectUser).subscribe(res => {
                    if (res.length > 0) {
                        for (const staff of res){
                            this.partmentUsers.push(staff);
                        }
                    }
                });
            }
        }
    }

    selectUser(user, event) {
        if (event.target.checked) {
            if (this.selectUsers.indexOf(user) === -1) {
                this.selectUsers.push(user);
            }
        } else {
            const index = this.selectUsers.indexOf(user);
            if (index > -1) {
                this.selectUsers.splice(index, 1);
            }
        }
        this.selectedChange.emit(this.selectUsers);
    }
}
