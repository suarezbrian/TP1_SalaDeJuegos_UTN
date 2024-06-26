import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { SharedService } from '../shared.service';
import { RegistroComponent } from '../registro/registro.component';
import { Subscription } from 'rxjs';
import { Usuario } from '../interfaces/usuario';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule, LoginComponent, RegistroComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  mostrarLoginPopup: boolean = false;
  mostrarRegistroPopup: boolean = false;
  overlayForm: boolean = false;
  estaLogeado: boolean = false;
  msjError: string = "";
  msjSucces: string = "";
  datosUsuario: Usuario[] = [];
  nombreUsuario: string = "";
  subscription!: Subscription;
  usuarioLogeado: Usuario | null = null;

  constructor(
    private sharedService: SharedService, 
    private authService: AuthService) { }

  ngOnInit() {
    this.sharedService.estaLogeado$.subscribe(estaLogeado => {
      this.estaLogeado = estaLogeado;
    });  

    this.subscription = this.sharedService.usuarioLogeado$.subscribe(usuario => {
      this.usuarioLogeado = usuario;
      this.datosUsuario = [];
      this.usuarioLogeado?this.datosUsuario.push(this.usuarioLogeado):this.datosUsuario = [];
      
      if(this.datosUsuario.length > 0){
        this.nombreUsuario = this.datosUsuario[0].usuario;
      }
      
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  openLoginPopup() {
    this.sharedService.formAbierto = true;
    this.sharedService.formRegistroAbierto = false;
    this.mostrarRegistroPopup = this.sharedService.formRegistroAbierto;
    this.mostrarLoginPopup =   this.sharedService.formAbierto;
  }

  openRegistroPopup(){
    this.sharedService.formRegistroAbierto = true;
    this.sharedService.formAbierto = false;
    this.mostrarRegistroPopup = this.sharedService.formRegistroAbierto;
    this.mostrarLoginPopup =   this.sharedService.formAbierto;
  }

  cerrarSesion(){
    this.authService.salir();
  }

}
