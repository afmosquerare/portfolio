import { Component, inject } from '@angular/core';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-language-toggle',
  standalone: true,
  template: `
    <div class="fixed top-6 right-6 z-[99] flex items-center bg-base-200/80 backdrop-blur-3xl p-1 rounded-full border border-white/5 text-xs font-bold uppercase shadow-2xl">
      <button
        (click)="setLang('en')"
        [class.bg-primary]="langService.currentLang() === 'en'"
        [class.text-primary-content]="langService.currentLang() === 'en'"
        [class.text-base-content]="langService.currentLang() === 'es'"
        class="flex items-center justify-center w-10 h-10 rounded-full transition-all cursor-pointer opacity-80 hover:opacity-100"
      >
        EN
      </button>
      <button
        (click)="setLang('es')"
        [class.bg-primary]="langService.currentLang() === 'es'"
        [class.text-primary-content]="langService.currentLang() === 'es'"
        [class.text-base-content]="langService.currentLang() === 'en'"
        class="flex items-center justify-center w-10 h-10 rounded-full transition-all cursor-pointer opacity-80 hover:opacity-100"
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
