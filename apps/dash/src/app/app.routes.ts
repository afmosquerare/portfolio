import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { loginGuard } from './core/guards/login.guard';

export const routes: Routes = [
  { path: 'auth/login', title: 'Login | Dash', canActivate: [loginGuard], loadComponent: () => import('./features/auth/auth').then(m => m.Auth) },
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () => import('./layouts/dash.layout'),
    children: [
      { path: '', title: 'Overview | Dash', loadComponent: () => import('./features/overview/overview') },
      { path: 'projects', title: 'Projects | Dash', loadComponent: () => import('./features/projects/projects') },
      { path: 'technologies', title: 'Technologies | Dash', loadComponent: () => import('./features/technologies/technologies') },
      { path: 'messages', title: 'Messages | Dash', loadComponent: () => import('./features/messages/messages') }
    ]
  },
  { path: '**', redirectTo: '' }
];
