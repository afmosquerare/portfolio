import { Routes } from '@angular/router';

export default [
  {
    path: 'projects',
    title: 'Projects | Andrés Rengifo',
    loadComponent: () => import('./projects/projects.page')
  },
  {
    path: 'about',
    title: 'About | Andrés Rengifo',
    loadComponent: () => import('./about/about.page')
  },
  {
    path: 'contact',
    title: 'Contact | Andrés Rengifo',
    loadComponent: () => import('./contact/contact.page')
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
] as Routes;
