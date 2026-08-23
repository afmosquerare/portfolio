import { Component, inject } from '@angular/core';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-language-toggle',
  standalone: true,
  template: `
    <div class="fixed top-6 right-6 md:right-10 z-[99] flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em]">
      <button
        (click)="setLang('en')"
        [class.opacity-100]="langService.currentLang() === 'en'"
        [class.opacity-40]="langService.currentLang() === 'es'"
        class="text-base-content transition-opacity duration-300 cursor-pointer"
      >
        EN
      </button>
      <span class="text-base-content/20">/</span>
      <button
        (click)="setLang('es')"
        [class.opacity-100]="langService.currentLang() === 'es'"
        [class.opacity-40]="langService.currentLang() === 'en'"
        class="text-base-content transition-opacity duration-300 cursor-pointer"
      >
        ES
      </button>
    </div>
  `
})
export class LanguageToggleComponent {
  langService = inject(LanguageService);

  setLang(lang: 'en' | 'es') {
    if (this.langService.currentLang() === lang) return;
    
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        this.langService.currentLang.set(lang);
      });
    } else {
      this.langService.currentLang.set(lang);
    }
  }
}
