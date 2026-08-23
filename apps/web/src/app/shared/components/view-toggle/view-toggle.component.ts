import { Component, model } from '@angular/core';

@Component({
  selector: 'app-view-toggle',
  standalone: true,
  template: `
    <div class="flex items-center gap-1 font-mono text-[10px] tracking-[0.2em] uppercase w-fit">
      <button
        (click)="updateView('grid')"
        [class.text-primary]="view() === 'grid'"
        [class.text-base-content]="view() !== 'grid'"
        class="flex items-center gap-2 px-3 py-1.5 rounded-md border-b-2 transition-colors cursor-pointer"
        [class.border-primary]="view() === 'grid'"
        [class.border-transparent]="view() !== 'grid'"
      >
        <span class="icon-[lucide--layout-grid] text-base"></span>
      </button>
      <button
        (click)="updateView('list')"
        [class.text-primary]="view() === 'list'"
        [class.text-base-content]="view() !== 'list'"
        class="flex items-center gap-2 px-3 py-1.5 rounded-md border-b-2 transition-colors cursor-pointer"
        [class.border-primary]="view() === 'list'"
        [class.border-transparent]="view() !== 'list'"
      >
        <span class="icon-[lucide--list] text-base"></span>
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
