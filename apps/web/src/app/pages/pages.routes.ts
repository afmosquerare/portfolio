import { Routes } from '@angular/router';
import ProjectsPage from './projects/projects.page';

export default [
  {
    path: 'projects',
    component: ProjectsPage,
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
] as Routes;
