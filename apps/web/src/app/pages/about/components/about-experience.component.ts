import { Component, inject } from '@angular/core';
import { LanguageService } from '../../../shared/services/language.service';

@Component({
  selector: 'about-experience',
  standalone: true,
  template: `
    <section class="mb-20">
      <h2 class="text-4xl font-bold tracking-tighter mb-10 flex items-center gap-3">
        {{ langService.t().ABOUT_EXP_TITLE }}
      </h2>
      <ul class="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
        @for (exp of langService.t().EXPERIENCES; track $index) {
        <li>
          <div class="timeline-middle">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-5 w-5 text-primary">
              <path fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clip-rule="evenodd" />
            </svg>
          </div>
          <div [class]="($index % 2 === 0 ? 'timeline-start md:text-end' : 'timeline-end') + ' mb-10'">
            <time class="font-mono italic text-sm text-base-content/50">{{ exp.date }}</time>
            <div class="text-xl font-bold text-base-content">{{ exp.role }}</div>
            <div class="text-primary/90 font-medium text-sm mb-2 uppercase tracking-wide">{{ exp.company }}</div>
            <p class="text-base-content/70 leading-relaxed font-light text-sm">
              {{ exp.description }}
            </p>
          </div>
          @if ($index !== langService.t().EXPERIENCES.length - 1) {
          <hr class="bg-primary/20" />
          }
        </li>
        }
      </ul>
    </section>
  `
})
export class AboutExperienceComponent {
  langService = inject(LanguageService);
}
