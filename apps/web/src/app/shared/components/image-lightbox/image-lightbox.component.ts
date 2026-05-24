import { Component, input, model } from '@angular/core';

@Component({
  selector: 'p-image-lightbox',
  standalone: true,
  template: `
    <dialog class="modal" [class.modal-open]="isOpen()">
      <button (click)="isOpen.set(false)"
        class="btn btn-circle btn-ghost fixed right-4 top-4 md:right-8 md:top-8 z-50 text-white bg-black/50 hover:bg-black/80 border border-white/10 backdrop-blur-sm">✕</button>
      <div
        class="modal-box bg-transparent shadow-none max-w-6xl w-full p-0 relative flex items-center justify-center h-full">
        <img [src]="imageUrl()" [alt]="altText()"
          class="max-h-[90vh] w-auto object-contain rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10" />
      </div>
      <form method="dialog" class="modal-backdrop bg-black/80 backdrop-blur-sm" (click)="isOpen.set(false)">
        <button>close</button>
      </form>
    </dialog>
  `
})
export class ImageLightboxComponent {
  isOpen = model<boolean>(false);
  imageUrl = input.required<string>();
  altText = input<string>('');
}
