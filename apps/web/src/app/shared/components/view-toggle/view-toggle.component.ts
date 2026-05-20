import { Component, model } from '@angular/core';

@Component({
  selector: 'app-view-toggle',
  standalone: true,
  template: `
    <div class="flex items-center bg-base-200/40 backdrop-blur-md p-1 rounded-full border border-white/5 text-[10px] font-bold tracking-[0.2em] uppercase w-fit">
      <button
        (click)="updateView('grid')"
        [class.bg-primary]="view() === 'grid'"
        [class.text-primary-content]="view() === 'grid'"
        [class.text-base-content]="view() === 'list'"
        class="flex items-center gap-2 px-4 py-1.5 rounded-full transition-all cursor-pointer opacity-80 hover:opacity-100"
      >
        <span class="icon-[lucide--layout-grid] text-lg"></span>
      </button>
      <button
        (click)="updateView('list')"
        [class.bg-primary]="view() === 'list'"
        [class.text-primary-content]="view() === 'list'"
        [class.text-base-content]="view() === 'grid'"
        class="flex items-center gap-2 px-4 py-1.5 rounded-full transition-all cursor-pointer opacity-80 hover:opacity-100"
      >
        <span class="icon-[lucide--list] text-lg"></span>
      </button>
    </div>
  `
})
export class ViewToggleComponent {
  view = model<'grid' | 'list'>('grid');

  updateView(newView: 'grid' | 'list') {
    if (this.view() === newView) return;
    
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        this.view.set(newView);
      });
    } else {
      this.view.set(newView);
    }
  }
}
