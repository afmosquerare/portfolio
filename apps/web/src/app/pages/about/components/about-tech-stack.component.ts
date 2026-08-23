import { Component, inject } from '@angular/core';
import { LanguageService } from '../../../shared/services/language.service';

@Component({
  selector: 'about-tech-stack',
  standalone: true,
  template: `
    <section>
      <p class="font-mono text-xs uppercase tracking-[0.25em] text-primary mb-6">
        {{ langService.t().ABOUT_TECH }}
      </p>

      <div class="flex flex-col">
        @for (category of stackCategories; track $index) {
        <div class="grid md:grid-cols-[170px_1fr] gap-x-6 gap-y-4 py-6 border-t border-base-content/10 last:border-b">
          <h3 class="font-mono text-xs uppercase tracking-[0.16em] text-base-content/45 pt-0.5">{{ category.title }}</h3>
          <div class="flex flex-wrap gap-x-7 gap-y-3">
            @for (tech of category.items; track $index) {
            <span class="inline-flex items-center gap-2 text-sm font-medium text-base-content/75 hover:text-base-content transition-colors">
              <span [class]="tech.icon + ' text-base ' + tech.color"></span>
              {{ tech.name }}
            </span>
            }
          </div>
        </div>
        }
      </div>
    </section>
  `
})
export class AboutTechStackComponent {
  langService = inject(LanguageService);

  get stackCategories() {
    const t = this.langService.t();
    return [
      {
        title: t.TECH_FRONTEND,
        items: [
          { name: 'Angular', icon: 'icon-[mdi--angular]', color: 'text-[#DD0031]' },
          { name: 'TypeScript', icon: 'icon-[mdi--language-typescript]', color: 'text-[#3178C6]' },
          { name: 'RxJS', icon: 'icon-[simple-icons--reactivex]', color: 'text-pink-500' },
          { name: 'PrimeNG', icon: 'icon-[simple-icons--primeng]', color: 'text-red-500' },
          { name: 'TailwindCSS', icon: 'icon-[mdi--tailwind]', color: 'text-[#06B6D4]' },
          { name: 'DevExtreme', icon: 'icon-[simple-icons--devexpress]', color: 'text-[#F98A1F]' },
          { name: 'Astro', icon: 'icon-[simple-icons--astro]', color: 'text-[#FF5D01]' }
        ]
      },
      {
        title: t.TECH_BACKEND,
        items: [
          { name: '.NET Core', icon: 'icon-[mdi--dot-net]', color: 'text-[#512BD4]' },
          { name: 'C#', icon: 'icon-[mdi--language-csharp]', color: 'text-[#512BD4]' },
          { name: 'LINQ', icon: 'icon-[mdi--database-search]', color: 'text-[#512BD4]' },
          { name: 'Entity Framework', icon: 'icon-[mdi--database-sync]', color: 'text-[#512BD4]' },
          { name: 'REST APIs', icon: 'icon-[mdi--api]', color: 'text-[#06B6D4]' }
        ]
      },
      {
        title: t.TECH_TESTING,
        items: [
          { name: 'Vitest', icon: 'icon-[simple-icons--vitest]', color: 'text-[#FCC72B]' },
          { name: 'xUnit', icon: 'icon-[lucide--flask-conical]', color: 'text-[#512BD4]' },
          { name: 'Jasmine', icon: 'icon-[simple-icons--jasmine]', color: 'text-[#8A4182]' },
          { name: 'Karma', icon: 'icon-[lucide--test-tube]', color: 'text-[#56C5A8]' }
        ]
      },
      {
        title: t.TECH_DATABASE,
        items: [
          { name: 'SQL Server', icon: 'icon-[mdi--database]', color: 'text-[#CC292B]' },
          { name: 'PostgreSQL', icon: 'icon-[simple-icons--postgresql]', color: 'text-[#4169E1]' },
          { name: 'Azure', icon: 'icon-[mdi--microsoft-azure]', color: 'text-[#0089D6]' },
          { name: 'Cloudinary', icon: 'icon-[simple-icons--cloudinary]', color: 'text-[#3448C5]' }
        ]
      },
      {
        title: t.TECH_TOOLS,
        items: [
          { name: 'Git', icon: 'icon-[mdi--git]', color: 'text-[#F1502F]' },
          { name: 'GitHub', icon: 'icon-[mdi--github]', color: 'text-[#FFFFFF]' },
          { name: 'Docker', icon: 'icon-[mdi--docker]', color: 'text-[#2496ED]' },
          { name: 'Taskfile', icon: 'icon-[lucide--terminal-square]', color: 'text-[#29BEB0]' },
          { name: 'Postman', icon: 'icon-[simple-icons--postman]', color: 'text-[#FF6C37]' },
        ]
      }
    ];
  }
}
