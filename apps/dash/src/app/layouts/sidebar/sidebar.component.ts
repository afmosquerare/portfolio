import { Component, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  host: {
    'class': 'menu p-4 w-[280px] min-h-full bg-base-200/95 text-base-content border-r border-white/5 flex flex-col'
  },
  template: `
      <div class="flex items-center justify-center px-4 py-6 mb-4">
        <span class="text-3xl font-bold tracking-tight text-white ">Control Panel</span>
      </div>
      <ul class="space-y-1">
        @for (item of navItems; track item.path) {
          <li>
            <a [routerLink]="[item.path]"
              [routerLinkActive]="['bg-primary', 'text-primary-content', 'active']"
              [routerLinkActiveOptions]="{exact: item.exact || false}"
              class="rounded-xl py-3 text-base-content/80 transition-colors flex gap-3 font-medium cursor-pointer">
              <span class="text-xl" [class]="item.icon"></span>
              {{ item.label }}
            </a>
          </li>
        }
      </ul>
      <ul class="mt-auto pt-6 space-y-1">
        <li>
          <a class="hover:bg-error/10 hover:text-error rounded-xl py-3 text-base-content/80 transition-colors flex gap-3 cursor-pointer"
            (click)="onLogout()">
            <span class="icon-[mdi--logout] text-xl"></span>
            Logout
          </a>
        </li>
      </ul>
  `
})
export class SidebarComponent {
  logout = output<void>();

  navItems = [
    { path: '/', label: 'Dashboard', icon: 'icon-[mdi--view-dashboard]', exact: true },
    { path: '/projects', label: 'Projects', icon: 'icon-[mdi--briefcase]' },
    { path: '/technologies', label: 'Technologies', icon: 'icon-[mdi--code-tags]' },
    { path: '/messages', label: 'Messages', icon: 'icon-[mdi--message]' }
  ];

  onLogout() {
    this.logout.emit();
  }
}
