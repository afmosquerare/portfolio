import { Component, input, output } from '@angular/core';

@Component({
  selector: 'page-header',
  standalone: true,
  template: `
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-3xl font-bold text-white tracking-tight">{{ title() }}</h2>
      @if (actionText()) {
        <button class="btn btn-primary" (click)="onAction.emit()">
          @if (actionIcon()) {
            <span [class]="actionIcon() + ' text-lg'"></span>
          }
          {{ actionText() }}
        </button>
      }
    </div>
  `
})
export class PageHeaderComponent {
  title = input<string>('');
  actionText = input<string>('');
  actionIcon = input<string>('icon-[mdi--plus]');
  onAction = output<void>();
}
