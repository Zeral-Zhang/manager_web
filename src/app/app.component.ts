import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
    // tslint:disable-next-line
    selector: 'body',
    template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit {
    constructor(private titleService: Title,
                private router: Router,
                private activatedRoute: ActivatedRoute,) {
    }

    private getPageTitle(routeSnapshot: ActivatedRouteSnapshot) {
        let title: string = (routeSnapshot.data && routeSnapshot.data['title']) ? routeSnapshot.data['title'] : 'Zeral管理系统';
        if (routeSnapshot.firstChild) {
            title = this.getPageTitle(routeSnapshot.firstChild) || title;
        }
        return title;
    }

    ngOnInit() {
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.titleService.setTitle(this.getPageTitle(this.router.routerState.snapshot.root));
            }
        });
    }
}
