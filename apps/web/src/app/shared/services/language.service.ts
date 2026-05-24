import { Injectable, signal, computed, effect } from '@angular/core';
import { TRANSLATIONS } from '../utils/translations';

export type Language = 'en' | 'es';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  currentLang = signal<Language>(this.getInitialLang());
  
  t = computed(() => TRANSLATIONS[this.currentLang()]);

  constructor() {
    effect(() => {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('preferred_lang', this.currentLang());
      }
    });
  }

  private getInitialLang(): Language {
    if (typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem('preferred_lang') as Language;
      if (saved === 'en' || saved === 'es') return saved;
    }
    return 'en';
  }

  toggleLanguage() {
    this.currentLang.update(lang => lang === 'en' ? 'es' : 'en');
  }
}
