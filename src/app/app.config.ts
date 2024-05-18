import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),provideHttpClient(), importProvidersFrom(provideFirebaseApp(() => 
  initializeApp({"projectId":"tp1-labo4-suarezbrianalan","appId":"1:583053500880:web:0e30a256770448de8259d5","storageBucket":"tp1-labo4-suarezbrianalan.appspot.com","apiKey":"AIzaSyDprZW9SQ4HWSABJKTNRcXCh9NHjKuhkpc","authDomain":"tp1-labo4-suarezbrianalan.firebaseapp.com","messagingSenderId":"583053500880","measurementId":"G-S8SCWX5NBD"}))), 
  importProvidersFrom(provideAuth(() => getAuth())), 
  importProvidersFrom(provideFirestore(() => getFirestore())),
  importProvidersFrom(provideDatabase(() => getDatabase())), provideAnimationsAsync()]
};
