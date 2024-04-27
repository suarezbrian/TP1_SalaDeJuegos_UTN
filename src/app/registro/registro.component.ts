import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SharedService } from '../shared.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { LogsService } from '../services/logs.service';
import { AlertsService } from '../services/alerts.service';

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

  constructor(
    private sharedService: SharedService, 
    private authService: AuthService,
    private logsService: LogsService,
    private alertService: AlertsService
    ) { }

  ngOnInit() {
    this.sharedService.formRegistroAbierto$.subscribe(estaAbierto => {
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
      this.alertService.mostrarAlerta(false, this.msjError, 2000); 
      this.logsService.guardarErrorLogs(this.msjError, "registro");
    }else{
      this.authService.registro(this.correoElectronico, this.password, this.nombreUsuario);
      this.cerrarRegistroForm();       
    }   
    
  }

  cerrarRegistroForm(){
    this.sharedService.formRegistroAbierto = false;
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
}