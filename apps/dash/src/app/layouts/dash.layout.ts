import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';

@Component({
  selector: 'app-dash-layout',
  imports: [RouterOutlet, SidebarComponent, NavbarComponent],
  templateUrl: './dash.layout.html'
})
export default class DashLayout {
  private router = inject(Router);
  private authService = inject(AuthService);

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
