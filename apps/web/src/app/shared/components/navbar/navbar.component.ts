import { TitleCasePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { LanguageService } from '../../services/language.service';

@Component({
  imports: [RouterLinkActive, RouterLink],
  selector: 'p-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  public langService = inject(LanguageService);

  get items() {
    return [
      { label: this.langService.t().NAV_HOME, path: '/home', icon: 'icon-[lucide--home]' },
      { label: this.langService.t().NAV_PROJECTS, path: '/projects', icon: 'icon-[lucide--folder]' },
      { label: this.langService.t().NAV_ABOUT, path: '/about', icon: 'icon-[lucide--user]' },
      { label: this.langService.t().NAV_CONTACT, path: '/contact', icon: 'icon-[lucide--mail]' },
    ];
  }
}
