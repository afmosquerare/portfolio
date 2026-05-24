import { Component, ElementRef, viewChild, input, output } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  template: `
    <dialog #dialog class="modal py-8 px-4 sm:p-0">
      <div class="modal-box w-full max-w-2xl bg-base-200 border border-white/10 overflow-y-auto scrollbar-thin scrollbar-thumb-base-content/20" [class]="customClasses()">
        @if (title()) {
          <h3 class="font-bold text-xl text-white mb-6">{{ title() }}</h3>
        }
        <ng-content></ng-content>
      </div>
      <form method="dialog" class="modal-backdrop">
        <button (click)="close()">close</button>
      </form>
    </dialog>
  `
})
export class ModalComponent {
  title = input<string>('');
  customClasses = input<string>('');
  onClose = output<void>();

  dialog = viewChild.required<ElementRef<HTMLDialogElement>>('dialog');

  open() {
    this.dialog().nativeElement.showModal();
  }

  close() {
    this.dialog().nativeElement.close();
    this.onClose.emit();
  }
}
