import { Component, inject } from '@angular/core';
import { ConfirmService } from '../services/confirm.service';

@Component({
  selector: 'confirm-dialog',
  standalone: true,
  template: `
    @if (confirmService.visible()) {
      <div class="fixed inset-0 z-[9999] flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-base-100/80 backdrop-blur-sm" (click)="confirmService.cancel()"></div>
        
        <div class="relative bg-base-200 border border-white/10 max-w-sm w-full rounded-2xl shadow-2xl animate-in fade-in zoom-in-95 duration-200">
          <div class="p-6">
            <h3 class="font-bold text-xl text-white mb-4">{{ config()?.title }}</h3>
            <p class="text-base-content/80 mb-6">{{ config()?.message }}</p>
            
            <div class="flex justify-end gap-3">
              <button class="btn btn-ghost" (click)="confirmService.cancel()">
                {{ config()?.cancelText }}
              </button>
              <button class="btn btn-error" (click)="confirmService.confirm()">
                {{ config()?.confirmText }}
              </button>
            </div>
          </div>
        </div>
      </div>
    }
  `
})
export class ConfirmComponent {
  public confirmService = inject(ConfirmService);
  public config = this.confirmService.config;
}
