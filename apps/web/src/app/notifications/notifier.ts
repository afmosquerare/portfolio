import { Component, inject } from '@angular/core';
import { NotifierService } from './notifier.service';

@Component({
  selector: 'notifier',
  template: `
    @if( notifierService.visible() ){
    <div
      role="alert"
      class="flex justify-center fixed right-4 top-4 z-9999 items-center gap-3 rounded-xl px-4 py-3 shadow-lg transition-all duration-300 ease-out "
      [class.opacity-0]="!notifierService.visible()"
      [class.opacity-100]="notifierService.visible()"
      [class.translate-x-10]="!notifierService.visible()"
      [class.translate-x-0]="notifierService.visible()"
      [class.scale-90]="!notifierService.visible()"
      [class.scale-100]="notifierService.visible()"
      [class.bg-success]="notifierService.type() === 'success'"
      [class.text-success-content]="notifierService.type() === 'success'"
      [class.bg-warning]="notifierService.type() === 'warn'"
      [class.text-warning-content]="notifierService.type() === 'warn'"
      [class.bg-error]="notifierService.type() === 'error'"
      [class.text-error-content]="notifierService.type()==='error'"
    >
      <div class="h-9 w-9 ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          class="h-8 w-8 stroke-current"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>

      <div class="h-full flex  items-center justify-center">
        <span class="whitespace-pre-line">
          {{ notifierService.message() }}
        </span>
      </div>
    </div>

    }
  `,
})
export class NotifierComponent {
  notifierService = inject(NotifierService);
}
