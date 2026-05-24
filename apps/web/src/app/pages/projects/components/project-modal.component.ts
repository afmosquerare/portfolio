import { Component, inject, input, model } from '@angular/core';
import { Project } from '../../../shared/services/project.service';
import { LanguageService } from '../../../shared/services/language.service';

@Component({
  selector: 'p-project-modal',
  standalone: true,
  template: `
    <dialog class="modal modal-bottom sm:modal-middle" [class.modal-open]="isOpen()">
      <div class="modal-box bg-base-200 border border-white/10 shadow-2xl relative p-0 overflow-hidden max-w-4xl">
        <button (click)="isOpen.set(false)"
          class="btn btn-md p-0 btn-circle btn-ghost absolute right-2 top-2 z-10 bg-base-300/50 hover:bg-base-300">✕</button>
        <img [src]="project().imageUrl" [alt]="langService.currentLang() === 'en' ? project().titleEn : project().titleEs"
          class="w-full h-64 sm:h-80 md:h-96 object-cover object-center" />
        <div class="p-8 md:p-12">
          <h3 class="font-bold text-3xl md:text-4xl mb-6">{{ langService.currentLang() === 'en' ? project().titleEn : project().titleEs }}</h3>
          
          <div class="flex flex-wrap items-center gap-2 mb-8">
            @for (tech of project().technologies; track tech.name) {
              <span class="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest border border-white/5 bg-base-300/80 text-base-content/90">
                {{ tech.name }}
              </span>
            }
          </div>

          <p class="py-4 text-base-content/80 leading-relaxed text-lg whitespace-pre-line">{{ langService.currentLang() === 'en' ? project().descriptionEn : project().descriptionEs }}</p>
          
          <div class="modal-action mt-8 flex gap-4 justify-end">
            @if (project().sourceCodeUrl) {
              <a [href]="project().sourceCodeUrl" target="_blank" class="btn btn-outline uppercase tracking-widest">
                <span class="icon-[lucide--code-2]"></span> {{ langService.t().SOURCE_CODE }}
              </a>
            }
            @if (project().liveDemoUrl) {
              <a [href]="project().liveDemoUrl" target="_blank" class="btn btn-primary uppercase tracking-widest">
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
