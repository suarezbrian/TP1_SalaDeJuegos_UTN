import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Usuario } from './interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class SharedService {


  //FORM - BOOL
  private _formAbierto: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  formAbierto$ = this._formAbierto.asObservable();

  get formAbierto(): boolean {
    return this._formAbierto.getValue();
  }

  set formAbierto(valor: boolean) {
    this._formAbierto.next(valor);
  }

  private _formRegistroAbierto: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  formRegistroAbierto$ = this._formRegistroAbierto.asObservable();

  get formRegistroAbierto(): boolean {
    return this._formRegistroAbierto.getValue();
  }

  set formRegistroAbierto(valor: boolean) {
    this._formRegistroAbierto.next(valor);
  }

  private _estaLogeado: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  estaLogeado$ = this._estaLogeado.asObservable();

  get estaLogeado(): boolean {
    return this._estaLogeado.getValue();
  }

  set estaLogeado(valor: boolean) {
    this._estaLogeado.next(valor);
  }

  // USUARIO
  private _usuarioLogeado: BehaviorSubject<Usuario | null> = new BehaviorSubject<Usuario | null>(null);
  usuarioLogeado$ = this._usuarioLogeado.asObservable();

  get usuarioLogeado(): Usuario | null {
    return this._usuarioLogeado.getValue();
  }

  set usuarioLogeado(usuario: Usuario | null) {
    this._usuarioLogeado.next(usuario);
  }

}
