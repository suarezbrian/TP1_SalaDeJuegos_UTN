import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { SharedService } from '../shared.service';
import { RegistroComponent } from '../registro/registro.component';
import { Auth, signOut } from '@angular/fire/auth';
import Swal from 'sweetalert2'
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable, Subject, Subscription } from 'rxjs';
import { Usuario } from '../interfaces/usuario';

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
  estaLogeado: boolean = false;
  msjError: string = "";
  msjSucces: string = "";
  datosUsuario: Usuario[] = [];
  nombreUsuario: string = "";
  subscription!: Subscription;
  usuarioLogeado: Usuario | null = null;

  constructor(private sharedService: SharedService, private auth: Auth, private router: Router,private firestore: Firestore) { }

  ngOnInit() {
    this.sharedService.estaLogeado$.subscribe(estaLogeado => {
      this.estaLogeado = estaLogeado;
    });  
    this.subscription = this.sharedService.usuarioLogeado$.subscribe(usuario => {
      this.usuarioLogeado = usuario;
  
      this.usuarioLogeado?this.datosUsuario.push(this.usuarioLogeado):this.datosUsuario = [];
      console.log(this.datosUsuario);

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
    this.mostrarLoginPopup = true;
    this.mostrarRegistroPopup = false;
  }

  openRegistroPopup(){
    this.sharedService.formAbierto = true;
    this.mostrarRegistroPopup = true;
    this.mostrarLoginPopup = false;
  }

  cerrarSesion(){
    this.sharedService.estaLogeado = false;
    this.auth.signOut().then(() => {
      this.msjSucces = "Sesión cerrada exitosamente."
      this.mostrarAlerta(true,this.msjSucces, 1500);
      this.router.navigate(['/home']);  
    }).catch((error) => {
      this.msjError = "Error al cerrar sesión:" + error
      this.mostrarAlerta(false,this.msjError, 2000);
    });
  }


  configuracionAlerta(tipo: boolean, mensaje: string, duracion: number) {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: duracion,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });  
    Toast.fire({
      icon: tipo ? "success": "error",
      title: mensaje,
    });
  }  
  
  mostrarAlerta(tipo: boolean, mensaje: string, duracion:number) {
    this.configuracionAlerta(tipo, mensaje, duracion);
  }

}
