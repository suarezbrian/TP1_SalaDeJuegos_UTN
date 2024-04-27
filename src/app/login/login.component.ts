import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SharedService } from '../shared.service';
import { FormsModule } from '@angular/forms';
import { Auth,signInWithEmailAndPassword,signOut } from '@angular/fire/auth';
import { Firestore, addDoc, collection, collectionData } from '@angular/fire/firestore';
import Swal from 'sweetalert2'
import { Observable, Subject, Subscription } from 'rxjs';
import { Usuario } from '../interfaces/usuario';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  loginFormAbierto: boolean = false;
  cbEstaActivo: boolean = false;
  banderaError: boolean = false;

  correoElectronico: string = "";;
  password: string = "";;
  usuarioLogeado: string = "";
  msjError: string = "";
  msjSucces: string = "";
  usuariopCollection: Usuario[] = []; 
  respCollection: any;

  subscription!: Subscription;

  constructor(private sharedService: SharedService, private auth: Auth, private firestore: Firestore, private router: Router) { }

  ngOnInit() {
    this.sharedService.formAbierto$.subscribe(estaAbierto => {
      this.loginFormAbierto = estaAbierto;
    });

    this.GetUsuarioCollection();   
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  Entrar() {

    this.banderaError = false;
    this.msjError = "";
    this.msjSucces = "";

    if(this.correoElectronico === ""){
      this.banderaError = true;
      this.msjError = "El campo email está vacío"; 
    }else if(this.password === ""){
      this.banderaError = true;
      this.msjError = "El campo contraseña está vacío";    
    }

    if(this.banderaError){
      this.mostrarAlerta(false, this.msjError, 2000); 
    }else{   
      signInWithEmailAndPassword(this.auth, this.correoElectronico, this.password).then((respuesta) => {
        if (respuesta.user.email !== null){  
          const usuarioEncontrado = this.usuariopCollection.find(usuario => usuario.email === respuesta.user.email); 
          usuarioEncontrado? this.sharedService.usuarioLogeado=usuarioEncontrado : this.sharedService.usuarioLogeado=null; 
          this.msjSucces = "Bienvenido, " + usuarioEncontrado?.usuario;
          this.usuarioLogeado = respuesta.user.email;
          this.banderaError = false;        
          this.sharedService.estaLogeado = true;
    
          let data = collection(this.firestore, 'logins');
          addDoc(data, { fecha: new Date(), "usuario": this.usuarioLogeado});
          
          this.cerrarLoginForm();
          this.mostrarAlerta(true, this.msjSucces, 1000);   
          this.router.navigate(['/home']);  
        }

      }).catch((e) => {

        console.log(e);
        let error = collection(this.firestore, 'errores');
        addDoc(error, { fecha: new Date(), "error": e.code, "tipo": "login"});

        this.banderaError = true;     
        
        switch (e.code) {
          case "auth/invalid-credential":
            this.msjError = "Credenciales invalidas";
            break;
          default:
            this.msjError = "Error, en el login del usuario"
            break;
        }

        this.mostrarAlerta(false, this.msjError, 3000);   
      });
    }
  }

  cerrarLoginForm() {   
    this.sharedService.formAbierto = false;    
  }

  autoCompletarCampos(){
    if(!this.cbEstaActivo){
      this.correoElectronico = 'admin-tester-registro@ejemplo.com';
      this.password = '@aSze1234';
    }else{
      this.correoElectronico = '';
      this.password = '';
    }
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
            this.usuariopCollection.push(usuario);
        }    
        
        usuariosSubject.next(this.usuariopCollection);
        usuariosSubject.complete(); 
    });   

    return usuariosSubject.asObservable(); 
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
