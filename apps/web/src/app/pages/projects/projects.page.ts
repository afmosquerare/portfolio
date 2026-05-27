import { Component, inject, signal, effect, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { rxResource } from '@angular/core/rxjs-interop';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { ProjectCardComponent } from './components/project-card.component';
import { ProjectCardSkeletonComponent } from './components/project-card-skeleton.component';
import { ViewToggleComponent } from '../../shared/components/view-toggle/view-toggle.component';
import { ProjectService } from '../../shared/services/project.service';
import { LanguageService } from '../../shared/services/language.service';

@Component({
  templateUrl: './projects.page.html',
  imports: [ProjectCardComponent, ProjectCardSkeletonComponent, ViewToggleComponent],
  standalone: true
})
export default class ProjectsPage {
  langService = inject(LanguageService);
  projectService = inject(ProjectService);
  private platformId = inject(PLATFORM_ID);

  viewMode = signal<'grid' | 'list'>('list');

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const savedView = localStorage.getItem('portfolio-view-mode') as 'grid' | 'list';
      if (savedView) {
        this.viewMode.set(savedView);
      }

      effect(() => {
        localStorage.setItem('portfolio-view-mode', this.viewMode());
      });
    }
  }

  projectsResource = rxResource({
    stream: () => this.projectService.getProjects()
  });
}
