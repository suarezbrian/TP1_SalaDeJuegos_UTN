import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SharedService } from '../shared.service';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service'; 
import { AlertsService } from '../services/alerts.service';
import { LogsService } from '../services/logs.service';


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

  subscription!: Subscription;

  constructor(
    private sharedService: SharedService, 
    private authService: AuthService,
    private alertService: AlertsService,
    private logsService: LogsService
  ){ }

  ngOnInit() {
    this.sharedService.formAbierto$.subscribe(estaAbierto => {
      this.loginFormAbierto = estaAbierto;
    });
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
      this.alertService.mostrarAlerta(false, this.msjError, 2000);
      this.logsService.guardarErrorLogs(this.msjError, "login"); 
    }else{   
      this.authService.entrar(this.correoElectronico, this.password);            
      this.cerrarLoginForm();   
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
}
