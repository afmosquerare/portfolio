import { Component, inject } from '@angular/core';
import { LanguageService } from '../../../shared/services/language.service';

@Component({
  selector: 'about-hero',
  standalone: true,
  template: `
    <div class="flex justify-between gap-2 pb-8 mb-10 border-b border-base-content/10">
      <div>
        <p class="font-mono text-xs uppercase tracking-[0.25em] text-primary">
          {{ langService.t().ABOUT_TITLE }}
        </p>
      </div>

      <div class="flex items-center gap-4">
        <a [href]="linkedinLink" target="_blank"
          class="text-base-content/60 hover:text-primary transition-colors hover:scale-110 duration-200"
          aria-label="LinkedIn">
          <span class="icon-[mdi--linkedin] text-2xl"></span>
        </a>
        <a [href]="githubLink" target="_blank"
          class="text-base-content/60 hover:text-primary transition-colors hover:scale-110 duration-200"
          aria-label="GitHub">
          <span class="icon-[mdi--github] text-2xl"></span>
        </a>
      </div>
    </div>

    <div class="grid md:grid-cols-2 gap-x-12 gap-y-4 text-base-content/60 text-lg leading-relaxed mb-8">
      <div class="flex flex-col gap-4">
        <p>{{ langService.t().ABOUT_SUBTITLE }}</p>
        <p [innerHTML]="langService.t().ABOUT_P1"></p>
      </div>
      <p [innerHTML]="langService.t().ABOUT_P2"></p>
    </div>

    <a href="/cv.pdf" target="_blank" class="btn btn-primary w-fit mb-14">
      <span class="icon-[lucide--download] text-xl"></span>
      {{ langService.t().ABOUT_CV }}
    </a>
  `
})
export class AboutHeroComponent {
  langService = inject(LanguageService);
  linkedinLink = 'https://www.linkedin.com/in/andr%C3%A9s-rengifo-331a26180/'
  githubLink = 'https://github.com/afmosquerare'
}
