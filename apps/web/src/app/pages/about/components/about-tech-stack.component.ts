import { Component, inject } from '@angular/core';
import { LanguageService } from '../../../shared/services/language.service';

@Component({
  selector: 'about-tech-stack',
  standalone: true,
  template: `
    <section>
      <h2 class="text-4xl font-bold tracking-tighter mb-12 flex items-center gap-3">
        {{ langService.t().ABOUT_TECH }}
      </h2>

      <div class="space-y-16">
        @for (category of stackCategories; track $index) {
        <div class="group cursor-default">
          <div class="border-b-2 border-primary/30 md:border-base-content/10 pb-4 mb-8 transition-colors duration-500 md:group-hover:border-primary/50">
            <h3 class="text-xl font-medium tracking-widest text-base-content/90 md:text-base-content/50 uppercase transition-colors duration-500 md:group-hover:text-base-content/90">{{ category.title }}</h3>
          </div>
          
          <div class="flex flex-wrap gap-x-12 gap-y-10">
            @for (tech of category.items; track $index) {
            <div class="flex flex-col items-center gap-4 md:hover:-translate-y-2 transition-transform duration-300">
              <span [class]="tech.icon + ' text-5xl sm:text-6xl ' + tech.color + ' transition-all duration-500 opacity-80 sm:group-hover:scale-110'"></span>
              <span class="text-sm font-semibold tracking-wide text-base-content/70 md:text-base-content/60 md:group-hover:text-base-content transition-colors duration-500">
                {{ tech.name }}
              </span>
            </div>
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
          { name: 'DevExtreme', icon: 'icon-[simple-icons--devexpress]', color: 'text-[#F98A1F]' }
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
          { name: 'Azure', icon: 'icon-[mdi--microsoft-azure]', color: 'text-[#0089D6]' }
        ]
      },
      {
        title: t.TECH_TOOLS,
        items: [
          { name: 'Git', icon: 'icon-[mdi--git]', color: 'text-[#F1502F]' },
          { name: 'GitHub', icon: 'icon-[mdi--github]', color: 'text-[#FFFFFF]' },
          { name: 'Docker', icon: 'icon-[mdi--docker]', color: 'text-[#2496ED]' },
          { name: 'Taskfile', icon: 'icon-[lucide--terminal-square]', color: 'text-[#29BEB0]' }
        ]
      }
    ];
  }
}
