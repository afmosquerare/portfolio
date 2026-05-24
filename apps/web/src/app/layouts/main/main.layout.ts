import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { LanguageToggleComponent } from '../../shared/components/language-toggle/language-toggle.component';

@Component({
  template: `
    <p-navbar />
    <app-language-toggle />
    <main class="pt-8 md:pt-36 pb-24 md:pb-12 px-6 max-w-6xl mx-auto">
      <router-outlet />
    </main>
  `,
  imports: [NavbarComponent, RouterOutlet, LanguageToggleComponent],
})
export default class MainLayout implements OnInit {
  constructor() { }

  ngOnInit() { }
}
