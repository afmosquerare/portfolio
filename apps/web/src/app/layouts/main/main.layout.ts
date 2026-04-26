import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  template: `
    <p-navbar />
    <main class="pt-40 pb-24 px-6 max-w-7xl mx-auto">
      <router-outlet />
    </main>
  `,
  imports: [NavbarComponent, RouterOutlet],
})
export default class MainLayout implements OnInit {
  constructor() {}

  ngOnInit() {}
}
