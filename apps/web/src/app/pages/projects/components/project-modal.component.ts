import { Component, inject, input, model } from '@angular/core';
import { Project } from '../../../shared/services/project.service';
import { LanguageService } from '../../../shared/services/language.service';

@Component({
  selector: 'p-project-modal',
  standalone: true,
  template: `
    <dialog class="modal py-8 px-4 sm:p-0" [class.modal-open]="isOpen()">
      <div class="modal-box w-full max-w-4xl bg-base-200 border border-white/10 shadow-2xl relative p-0 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-base-content/20">
        <button (click)="isOpen.set(false)"
          class="btn btn-md p-0 btn-circle btn-ghost absolute right-2 top-2 z-10 bg-base-300/50 hover:bg-base-300">✕</button>
        <img [src]="project().imageUrl" [alt]="langService.currentLang() === 'en' ? project().titleEn : project().titleEs"
          class="w-full h-56 sm:h-80 md:h-96 object-cover object-center" />
        <div class="p-6 md:p-12">
          <h3 class="font-bold text-2xl md:text-4xl mb-6">{{ langService.currentLang() === 'en' ? project().titleEn : project().titleEs }}</h3>

          <p class="py-4 text-base-content/80 leading-relaxed text-base sm:text-lg whitespace-pre-line">{{ langService.currentLang() === 'en' ? project().descriptionEn : project().descriptionEs }}</p>
          
          <div class="modal-action mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 sm:justify-end">
            @if (project().sourceCodeUrl) {
              <a [href]="project().sourceCodeUrl" target="_blank" class="btn btn-outline uppercase tracking-widest w-full sm:w-auto">
                <span class="icon-[lucide--code-2]"></span> {{ langService.t().SOURCE_CODE }}
              </a>
            }
            @if (project().liveDemoUrl) {
              <a [href]="project().liveDemoUrl" target="_blank" class="btn btn-primary uppercase tracking-widest w-full sm:w-auto">
                {{ langService.t().LIVE_DEMO }} <span class="icon-[lucide--arrow-right]"></span>
              </a>
            }
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
