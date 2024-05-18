import { Routes } from '@angular/router';

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
        loadComponent:()=> import('./chat/chat.component').then(c => c.ChatComponent)
    },
    {
        path: 'about',
        loadComponent:()=> import('./about/about.component').then(c => c.AboutComponent)
    },
    {
        path: 'ahorcado',
        loadComponent:()=> import('./juegos/ahorcado/ahorcado.component').then(c => c.AhorcadoComponent)
    },
    {
        path: 'mayor-o-menor',
        loadComponent:()=> import('./juegos/mayor-omenor/mayor-omenor.component').then(c => c.MayorOMenorComponent)
    },
    {
        path: 'busca-minas',
        loadComponent:()=> import('./juegos/busca-minas/busca-minas.component').then(c => c.BuscaMinasComponent)
    },
    {
        path: 'preguntados',
        loadComponent:()=> import('./juegos/preguntados/preguntados.component').then(c => c.PreguntadosComponent)
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
