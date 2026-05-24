import { Component, inject } from '@angular/core';
import { LanguageService } from '../../../shared/services/language.service';

@Component({
  selector: 'about-hero',
  standalone: true,
  template: `
    <header class="mb-8">
      <div class="flex justify-between items-end mb-4">
        <h1 class="text-7xl md:text-8xl font-extrabold tracking-tighter text-base-content leading-none">
          {{ langService.t().ABOUT_TITLE }}
        </h1>
        <div class="flex items-center gap-4 pb-2 pr-2">
          <a href="https://linkedin.com/in/afmosquerare" target="_blank"
            class="text-base-content/60 hover:text-primary transition-colors hover:scale-110 duration-200"
            aria-label="LinkedIn">
            <span class="icon-[mdi--linkedin] text-4xl"></span>
          </a>
          <a href="https://github.com/afmosquerare" target="_blank"
            class="text-base-content/60 hover:text-primary transition-colors hover:scale-110 duration-200"
            aria-label="GitHub">
            <span class="icon-[mdi--github] text-4xl"></span>
          </a>
        </div>
      </div>
      <p class="text-base-content/60 text-xl font-light leading-relaxed ">
        {{ langService.t().ABOUT_SUBTITLE }}
      </p>
    </header>

    <section class="mb-14 grid gap-6 items-start">
      <div class="md:col-span-2 space-y-4 text-base-content/80 text-lg leading-relaxed">
        <p [innerHTML]="langService.t().ABOUT_P1"></p>
        <p [innerHTML]="langService.t().ABOUT_P2"></p>
      </div>
      <div class="flex items-start">
        <a href="/cv.pdf" target="_blank"
          class="btn btn-primary text-white rounded-full font-bold w-full sm:w-auto hover:scale-105 ">
          <span class="icon-[lucide--download] text-xl"></span>
          {{ langService.t().ABOUT_CV }}
        </a>
      </div>
    </section>
  `
})
export class AboutHeroComponent {
  langService = inject(LanguageService);
}
