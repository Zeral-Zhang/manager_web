import { Component } from '@angular/core';
import { LoginService } from '../../../core/auth/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html'
})
export class AppHeaderComponent {
    constructor(
        private loginService: LoginService,
        private router: Router
    ) {
    }

    logout() {
        this.loginService.logout();
        this.router.navigate(['/login']);
    }
}
