import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { ErrorComponent } from './error/error.component';
import { AboutComponent } from './about/about.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        loadComponent:()=> import('./home/home.component').then(c => c.HomeComponent)
    },
    {
        path: 'about',
        loadComponent:()=> import('./about/about.component').then(c => c.AboutComponent)
    },
    {
        path: 'error',
        loadComponent:()=> import('./error/error.component').then(c => c.ErrorComponent)
    },
    {
        path: '**', 
        redirectTo: '/error'
    }
];
