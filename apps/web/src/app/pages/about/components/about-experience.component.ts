import { Component, inject } from '@angular/core';
import { LanguageService } from '../../../shared/services/language.service';

@Component({
  selector: 'about-experience',
  standalone: true,
  template: `
    <section class="mb-20">
      <p class="font-mono text-xs uppercase tracking-[0.25em] text-primary mb-6">
        {{ langService.t().ABOUT_EXP_TITLE }}
      </p>

      <div class="flex flex-col">
        @for (exp of langService.t().EXPERIENCES; track $index) {
        <div class="grid md:grid-cols-[140px_1fr] gap-x-6 gap-y-2 py-7 border-t border-base-content/10 last:border-b">
          <time class="font-mono text-xs text-base-content/45 tabular-nums">{{ exp.date }}</time>
          <div>
            <div class="text-xl font-bold text-base-content mb-1">{{ exp.role }}</div>
            <div class="font-mono text-primary/90 font-medium text-xs mb-3 uppercase tracking-wide">{{ exp.company }}</div>
            <p class="text-base-content/60 leading-relaxed text-sm max-w-2xl">
              {{ exp.description }}
            </p>
          </div>
        </div>
        }
      </div>
    </section>
  `
})
export class AboutExperienceComponent {
  langService = inject(LanguageService);
}
