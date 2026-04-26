import { Component } from '@angular/core';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { ProjectCardComponent } from './components/project-card.component';
@Component({
  templateUrl: './projects.page.html',
  imports: [ProjectCardComponent],
})
export default class ProjectsPage {}
