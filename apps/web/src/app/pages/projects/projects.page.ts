import { Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { ProjectCardComponent } from './components/project-card.component';
import { ViewToggleComponent } from '../../shared/components/view-toggle/view-toggle.component';
import { ProjectService } from '../../shared/services/project.service';
import { LanguageService } from '../../shared/services/language.service';

@Component({
  templateUrl: './projects.page.html',
  imports: [ProjectCardComponent, ViewToggleComponent],
  standalone: true
})
export default class ProjectsPage {
  langService = inject(LanguageService);
  projectService = inject(ProjectService);

  viewMode = signal<'grid' | 'list'>('grid');

  projectsResource = rxResource({
    stream: () => this.projectService.getProjects()
  });
}
