import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SharedService } from '../shared.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent implements OnInit{
  cbEstaActivo: boolean = false;
  registroFormAbierto: boolean = false;
  banderaError: boolean = false;

  nombreUsuario: string = "";
  confirmarPassword: string = "";
  password: string = "";
  correoElectronico: string = "";
  msjError: string = "";
  msjSucces: string = "";

  constructor(private sharedService: SharedService, private auth: Auth, private firestore: Firestore) { }

  ngOnInit() {
    this.sharedService.formAbierto$.subscribe(estaAbierto => {
      this.registroFormAbierto = estaAbierto;
    });
  }

  Registro() {

    this.banderaError = false;
    this.msjError = "";
    this.msjSucces = "";
    
    if(this.correoElectronico === ""){
      this.banderaError = true;
      this.msjError = "El campo email está vacío"; 
    }else if(this.password === ""){
      this.banderaError = true;
      this.msjError = "El campo contraseña está vacío";    
    }else if(this.confirmarPassword === ""){
      this.banderaError = true;
      this.msjError = "El campo confirmar contraseña está vacío";     
    }else if(this.nombreUsuario === ""){
      this.banderaError = true;
      this.msjError = "El campo usuario está vacío";     
    }else if(this.password !== this.confirmarPassword){
      this.banderaError = true;
      this.msjError = "Las contraseñas no coinciden";
    }else if(this.nombreUsuario.length < 5 || this.nombreUsuario.length > 15){
      this.banderaError = true;
      this.msjError = "El nombre debe tener entre 5 y 15 caracteres";
    }

    if (this.banderaError) {
      this.mostrarAlerta(false, this.msjError, 2000); 
    }else{
      createUserWithEmailAndPassword(this.auth, this.correoElectronico, this.password).then((respuesta) => {
        if (respuesta.user.email !== null){ 
          
          this.msjSucces = "Registro Exitoso, " + this.nombreUsuario;
          let usuariosCollection = collection(this.firestore, 'usuarios');
          addDoc(usuariosCollection, {"usuario": this.nombreUsuario, "email": this.correoElectronico, "fecha_registro": new Date(), "rol": 1});

          let registroCollection = collection(this.firestore, 'registros');
          addDoc(registroCollection, { fecha: new Date(), "usuario": this.correoElectronico});

          this.banderaError = false;    
          this.mostrarAlerta(true, this.msjSucces, 3000);    
          this.cerrarRegistroForm();
        }

      }).catch((e) => {

        let errorCollection = collection(this.firestore, 'errores');
        addDoc(errorCollection, { fecha: new Date(), "error": e.code, "tipo": "registro"});

        console.log(e);
        this.banderaError = true;     
       
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

        this.mostrarAlerta(false, this.msjError, 2000);        
      });  
    }   
    
  }

  cerrarRegistroForm(){
    this.sharedService.formAbierto = false;
  }

  autoCompletarCampos(){
    if(!this.cbEstaActivo){
      this.correoElectronico = 'admin-tester-registro@ejemplo.com';
      this.password = '@aSze1234';
      this.confirmarPassword = '@aSze1234';
      this.nombreUsuario = 'Admin Tester';
    }else{
      this.correoElectronico = '';
      this.password = '';
      this.confirmarPassword = '';
      this.nombreUsuario = '';
    }
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