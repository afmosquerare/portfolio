import { Component, inject, input, model } from '@angular/core';
import { Project } from '../../../shared/services/project.service';
import { LanguageService } from '../../../shared/services/language.service';

@Component({
  selector: 'p-project-modal',
  standalone: true,
  template: `
    <dialog class="modal" [class.modal-open]="isOpen()">
      <div class="modal-box w-[calc(100%-2rem)] max-w-4xl max-h-[calc(100vh-4rem)] bg-base-200 border border-white/10 shadow-2xl relative p-0 overflow-hidden flex flex-col rounded-2xl">
        <button (click)="isOpen.set(false)"
          class="btn-md cursor-pointer p-0 btn-circle  absolute right-3 top-3 sm:right-4 sm:top-4 z-20 bg-black/50 text-white hover:bg-black/70 backdrop-blur-sm border-none">✕</button>
        <div class="overflow-y-auto overflow-x-hidden flex-1 scrollbar-thin scrollbar-thumb-base-content/20">
          <img [src]="project().imageUrl" [alt]="langService.currentLang() === 'en' ? project().titleEn : project().titleEs"
            class="w-full h-56 sm:h-80 md:h-96 object-cover object-center" />
        <div class="p-6 md:p-12">
          <h3 class="font-bold text-2xl md:text-4xl mb-6">{{ langService.currentLang() === 'en' ? project().titleEn : project().titleEs }}</h3>

          <p class="py-4 text-base-content/80 leading-relaxed text-base sm:text-lg whitespace-pre-line">{{ langService.currentLang() === 'en' ? project().descriptionEn : project().descriptionEs }}</p>
          
    <div class="mt-6 flex flex-col md:flex-row gap-3 justify-end">
      @if (project().liveDemoUrl) {
      <a [href]="project().liveDemoUrl" target="_blank"
        class=" btn btn-primary tracking-widest">
        {{ langService.t().LIVE_DEMO }} <span class="icon-[lucide--arrow-right]"></span>
      </a>
      }
      @if (project().sourceCodeUrl) {
      <a [href]="project().sourceCodeUrl" target="_blank"
        class=" btn btn-outline tracking-widest ">
        <span class="icon-[lucide--code-2]"></span> {{ langService.t().SOURCE_CODE }}
      </a>
      }
    </div>
          </div>
        </div>
      </div>
      <form method="dialog" class="modal-backdrop bg-black/60 backdrop-blur-sm" (click)="isOpen.set(false)">
        <button>close</button>
      </form>
    </dialog>
  `
})
export class ProjectModalComponent {
  isOpen = model<boolean>(false);
  project = input.required<Project>();
  langService = inject(LanguageService);
}
