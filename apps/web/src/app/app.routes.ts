import { Routes } from '@angular/router';
import { HomePage } from './pages/home/home.page';

export const routes: Routes = [
    {
        path: 'home',
        title: 'Andrés Rengifo',
        component: HomePage
    },
    {
        path: '',
        loadComponent: ()=> import('./layouts/main/main.layout'),
        loadChildren: ()=> import('./pages/pages.routes')
    },
    {
        path: '**',
        redirectTo: 'home'
    }
];
