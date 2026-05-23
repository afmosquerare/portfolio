import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'stat-card',
  standalone: true,
  imports: [RouterLink],
  template: `
    <a [routerLink]="link()"
      class="group flex flex-col p-6 bg-base-200/40 border border-base-content/5 hover:bg-base-200 hover:border-base-content/20 transition-colors rounded-xl cursor-pointer">
      <span class="text-base-content/60 text-xs font-semibold tracking-[0.1em] uppercase mb-6">{{ title() }}</span>
      <p class="text-4xl text-base-content font-bold">{{ value() }}</p>
    </a>
  `
})
export class StatCardComponent {
  title = input.required<string>();
  value = input.required<number | string>();
  link = input<string>('/');
}
