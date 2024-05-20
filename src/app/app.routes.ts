import { Routes } from '@angular/router';
import { authGuard } from './auth.guard';

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
        path: 'chat',
        loadComponent:()=> import('./chat/chat.component').then(c => c.ChatComponent),
        canActivate: [authGuard]
    },
    {
        path: 'about',
        loadComponent:()=> import('./about/about.component').then(c => c.AboutComponent),
        canActivate: [authGuard]
    },
    {
        path: 'ahorcado',
        loadComponent:()=> import('./juegos/ahorcado/ahorcado.component').then(c => c.AhorcadoComponent),
        canActivate: [authGuard]
    },
    {
        path: 'mayor-o-menor',
        loadComponent:()=> import('./juegos/mayor-omenor/mayor-omenor.component').then(c => c.MayorOMenorComponent),
        canActivate: [authGuard]
    },
    {
        path: 'busca-minas',
        loadComponent:()=> import('./juegos/busca-minas/busca-minas.component').then(c => c.BuscaMinasComponent),
        canActivate: [authGuard]
    },
    {
        path: 'preguntados',
        loadComponent:()=> import('./juegos/preguntados/preguntados.component').then(c => c.PreguntadosComponent),
        canActivate: [authGuard]
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
