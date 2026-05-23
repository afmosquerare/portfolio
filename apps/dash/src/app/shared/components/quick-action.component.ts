import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'quick-action',
  standalone: true,
  imports: [RouterLink],
  template: `
    <a [routerLink]="link()" [queryParams]="queryParams()"
      class="px-4 py-2 bg-transparent border border-base-content/10 hover:bg-base-200 hover:border-base-content/30 text-base-content/60 hover:text-base-content transition-colors rounded-lg flex items-center gap-2 text-sm font-medium cursor-pointer">
      <span [class]="icon() + ' text-lg'"></span> {{ title() }}
    </a>
  `
})
export class QuickActionComponent {
  title = input.required<string>();
  icon = input<string>('');
  link = input<string>('/');
  queryParams = input<any>(null);
}
