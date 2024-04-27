import { Injectable } from '@angular/core';
import { Auth,signInWithEmailAndPassword,createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Usuario } from '../interfaces/usuario';
import { SharedService } from '../shared.service';
import { LogsService } from './logs.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { UsuarioService } from './usuario.service';
import { AlertsService } from './alerts.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  usuariosSubscription!: Subscription;
  usuarios: Usuario[] = [];
  msjError: string = "";
  msjSucces: string = "";

  constructor(
    private auth: Auth,
    private router: Router,
    private sharedService: SharedService,
    private logsService: LogsService,
    private usuarioService: UsuarioService,
    private alertService: AlertsService
  ) { }

  ngOnDestroy(): void {
    if (this.usuariosSubscription) {
      this.usuariosSubscription.unsubscribe();      
    }
  }

  entrar(email: string, password: string) {
    this.obtenerUsuarios();
    signInWithEmailAndPassword(this.auth, email, password).then((respuesta)=>{
      if (respuesta.user.email !== null){ 

        this.sharedService.estaLogeado = true;

        const usuarioEncontrado = this.usuarios
        .find(usuario => usuario.email === respuesta.user.email); 

        usuarioEncontrado? this.sharedService.usuarioLogeado=usuarioEncontrado : this.sharedService.usuarioLogeado=null;

        const logData = {
          email: usuarioEncontrado?.email,
          usuario: usuarioEncontrado?.usuario,
          fecha: new Date(),
        };

        this.logsService.guardarLogs(logData, "logins");
        this.msjSucces = "Bienvenido, " + usuarioEncontrado?.usuario;
        this.alertService.mostrarAlerta(true, this.msjSucces, 1000);       
        this.router.navigate(['/home']);
      }
    }).catch((e) => {        

      switch (e.code) {
        case "auth/invalid-credential":
          this.msjError = "Credenciales invalidas";
          break;
        default:
          this.msjError = "Error, en el login del usuario"
          break;
      } 

      this.logsService.guardarErrorLogs(this.msjError, "login");
      this.alertService.mostrarAlerta(false, this.msjError, 2000);  
    });;
  }

  registro(email: string, password: string, usuario: string) {
    createUserWithEmailAndPassword(this.auth, email, password).then((respuesta)=>{
      if (respuesta.user.email !== null){ 
          
        this.msjSucces = "Registro Exitoso, " + usuario;

        const usuarioData: Usuario = {
          email: email,
          fecha_registro: new Date(), 
          rol: 1, 
          usuario: usuario
        };
        this.usuarioService.guardarUsuario(usuarioData);

        const logData = {       
          usuario: email,
          fecha: new Date(),
        };
        this.logsService.guardarLogs(logData, "registros"); 
         
        this.alertService.mostrarAlerta(true, this.msjSucces, 1500);  
        this.router.navigate(['/home']);

        this.entrar(email,password);
      }


    }).catch((e) => {
     
      switch (e.code) {
        case "auth/invalid-email":
          this.msjError = "Error, email inválido";
          break;
        case "auth/email-already-in-use":
          this.msjError = "Error, email ya está en uso";
          break;
        case "auth/missing-password":
          this.msjError = "Error, contraseña inválida";
          break;
        case "auth/weak-password":
          this.msjError = "Error, contraseña débil";
          break;
        default:
          this.msjError = "Error en el registro"
          break;
      }

      this.logsService.guardarErrorLogs(this.msjError, "registro");
      this.alertService.mostrarAlerta(false, this.msjError, 2000);        
    });
  }

  salir() {
    this.sharedService.estaLogeado = false;
    this.auth.signOut().then(() => {
      this.msjSucces = "Sesión cerrada exitosamente."
      this.alertService.mostrarAlerta(true,this.msjSucces, 1500);
      this.router.navigate(['/home']);  
    }).catch((error) => {
      this.msjError = "Error al cerrar sesión:" + error
      this.alertService.mostrarAlerta(false,this.msjError, 2000);
    });
  }

  obtenerUsuarios(): void {    
    this.usuarioService.usuarioCollection$.subscribe(usuarios => {
      if (usuarios !== null) {
        this.usuarios = usuarios;        
      }
    });
  }
}
