import { Component, signal } from '@angular/core';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { ProjectCardComponent } from './components/project-card.component';
import { ViewToggleComponent } from '../../shared/components/view-toggle/view-toggle.component';

@Component({
  templateUrl: './projects.page.html',
  imports: [ProjectCardComponent, ViewToggleComponent],
  standalone: true
})
export default class ProjectsPage {
  viewMode = signal<'grid' | 'list'>('grid');
}
