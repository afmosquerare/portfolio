import { Component, inject, input, signal } from '@angular/core';
import { Project } from '../../../shared/services/project.service';
import { LanguageService } from '../../../shared/services/language.service';
import { ImageLightboxComponent } from '../../../shared/components/image-lightbox/image-lightbox.component';
import { ProjectModalComponent } from './project-modal.component';

@Component({
  selector: 'p-project-card',
  standalone: true,
  imports: [ImageLightboxComponent, ProjectModalComponent],
  template: `
<div class="group bg-transparent border border-white/5 rounded-3xl overflow-hidden transition-all duration-500 flex"
  [class.flex-col]="true" [class.md:flex-row]="view() === 'list'">
  <div class="relative overflow-hidden shrink-0 border-white/5 cursor-pointer" [class.w-full]="true"
    [class.md:w-2/5]="view() === 'list'" [class.border-b]="view() === 'grid'" [class.md:border-b-0]="view() === 'list'"
    [class.md:border-r]="view() === 'list'" [class.aspect-[16/10]]="view() === 'grid'" (click)="isFullscreen.set(true)">
    <img [src]="project().imageUrl" [alt]="langService.currentLang() === 'en' ? project().titleEn : project().titleEs"
      class="w-full h-full object-cover object-center grayscale-[50%] opacity-80 group-hover:scale-105 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 ease-in-out" />
    <div class="absolute inset-0 bg-linear-to-t from-base-100 via-base-100/10 to-transparent opacity-90"></div>
  </div>
  <div class="p-6 md:p-8 grow flex flex-col">
    <div class="flex flex-wrap items-center gap-2 mb-4">
      @for (tech of project().technologies; track tech.name) {
      <span
        class="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest border border-white/5 bg-base-200/80 text-base-content/90">
        {{ tech.name }}
      </span>
      }
    </div>
    <h3 class="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
      {{ langService.currentLang() === 'en' ? project().titleEn : project().titleEs }}
    </h3>
    <p class="text-base-content/50 leading-relaxed mb-3 text-base line-clamp-3">
      {{ langService.currentLang() === 'en' ? project().descriptionEn : project().descriptionEs }}
    </p>
    <button (click)="isModalOpen.set(true)"
      class="text-primary hover:text-primary/80 font-bold uppercase tracking-widest text-xs self-start mb-6 cursor-pointer transition-colors">
      {{ langService.t().READ_MORE }}
    </button>
    <div class="mt-auto flex flex-col lg:flex-row gap-3">
      @if (project().liveDemoUrl) {
      <a [href]="project().liveDemoUrl" target="_blank"
        class="flex-1 btn btn-primary hover:scale-105 text-sm tracking-widest uppercase">
        {{ langService.t().LIVE_DEMO }} <span class="icon-[lucide--arrow-right]"></span>
      </a>
      }
      @if (project().sourceCodeUrl) {
      <a [href]="project().sourceCodeUrl" target="_blank"
        class="flex-1 btn btn-outline text-sm tracking-widest uppercase">
        <span class="icon-[lucide--code-2]"></span> {{ langService.t().SOURCE_CODE }}
      </a>
      }
    </div>
  </div>
</div>

<p-project-modal [(isOpen)]="isModalOpen" [project]="project()" />

<p-image-lightbox [(isOpen)]="isFullscreen" [imageUrl]="project().imageUrl ?? ''"
  [altText]="langService.currentLang() === 'en' ? project().titleEn : project().titleEs" />
    `
})
export class ProjectCardComponent {
  view = input<'grid' | 'list'>('grid');
  project = input.required<Project>();
  langService = inject(LanguageService);
  isModalOpen = signal(false);
  isFullscreen = signal(false);
} 