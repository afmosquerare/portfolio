import { Routes } from '@angular/router';

export default [
  {
    path: 'projects',
    loadComponent: () => import('./projects/projects.page')
  },
  {
    path: 'about',
    loadComponent: () => import('./about/about.page')
  },
  {
    path: 'contact',
    loadComponent: () => import('./contact/contact.page')
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
] as Routes;
