import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { loginGuard } from './core/guards/login.guard';

export const routes: Routes = [
  { path: 'auth/login', canActivate: [loginGuard], loadComponent: () => import('./features/auth/auth').then(m => m.Auth) },
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () => import('./layouts/dash.layout'),
    children: [
      { path: '', loadComponent: () => import('./features/overview/overview') },
      { path: 'projects', loadComponent: () => import('./features/projects/projects') },
      { path: 'technologies', loadComponent: () => import('./features/technologies/technologies') },
      { path: 'messages', loadComponent: () => import('./features/messages/messages') }
    ]
  },
  { path: '**', redirectTo: '' }
];
