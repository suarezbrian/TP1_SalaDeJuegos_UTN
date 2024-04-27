import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData } from '@angular/fire/firestore';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  usuarioCollection: Usuario[] = []; 
  respCollection: any;
  subscription!: Subscription;

  private _usuarioCollection: BehaviorSubject<Usuario[] | null> = new BehaviorSubject<Usuario[] | null>(null);
  usuarioCollection$ = this._usuarioCollection.asObservable();

  constructor(
    private firestore: Firestore
  ) { 
    this.GetUsuarioCollection();   
  }

  GetUsuarioCollection(): Observable<Usuario[]> {
    let usuairoCollection = collection(this.firestore, 'usuarios');

    const observable = collectionData(usuairoCollection);

    const usuariosSubject = new Subject<Usuario[]>();

    this.subscription = observable.subscribe((respuesta) => {
        this.respCollection = respuesta;
       
        for (let i = 0; i < respuesta.length; i++) {
            let usuario: Usuario = {
                email: this.respCollection[i].email,
                fecha_registro: new Date(this.respCollection[i].fecha_registro.seconds * 1000),
                rol: this.respCollection[i].rol,
                usuario: this.respCollection[i].usuario
            };
            this.usuarioCollection.push(usuario);
        } 

        this._usuarioCollection.next(this.usuarioCollection);        
        usuariosSubject.next(this.usuarioCollection);
        usuariosSubject.complete(); 
    });   

    return usuariosSubject.asObservable(); 
  }

  saveUserData(usuarioData: Usuario) {
    try {
      const usuariosCollection = collection(this.firestore, 'usuarios');
      addDoc(usuariosCollection, usuarioData);
    } catch (error) {
      console.error('Error al guardar los datos del usuario:', error);
      throw error;
    }
  }


  get getUsuarioCollection(): Usuario[] | null  {
    return this._usuarioCollection.getValue();
  }

  set setUsuarioCollection(valor: Usuario[] | null) {
    this._usuarioCollection.next(valor);
  }
}
