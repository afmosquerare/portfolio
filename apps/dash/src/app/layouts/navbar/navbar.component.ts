import { Component, output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  host: {
    'class': 'w-full navbar bg-base-100/50 sticky top-0 z-30 border-b border-white/5 px-4 lg:px-8'
  },
  template: `
      <div class="flex-none lg:hidden">
        <label for="my-drawer-2" aria-label="open sidebar" class="btn btn-square btn-ghost">
          <span class="icon-[mdi--menu] text-xl "></span>
        </label>
      </div>
      <div class="flex-1 lg:hidden font-bold text-2xl ml-2 tracking-tight font-['Montserrat_Alternates'] text-white">Control Panel</div>
      <div class="flex-1 hidden lg:flex"></div>
      <div class="flex-none lg:hidden">
        <button class="btn btn-ghost btn-circle hover:bg-error/20 hover:text-error" (click)="onLogout()">
          <span class="icon-[mdi--logout] text-xl"></span>
        </button>
      </div>
  `
})
export class NavbarComponent {
  logout = output<void>();

  onLogout() {
    this.logout.emit();
  }
}
