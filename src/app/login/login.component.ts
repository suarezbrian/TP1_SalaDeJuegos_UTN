import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SharedService } from '../shared.service';
import { FormsModule } from '@angular/forms';

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
  correoElectronico: string = '';
  password: string = '';

  constructor(private sharedService: SharedService) { }

  ngOnInit() {
    this.sharedService.formAbierto$.subscribe(estaAbierto => {
      this.loginFormAbierto = estaAbierto;
    });
  }

  closeLoginForm() {
    this.sharedService.formAbierto = false;
  }

  autoCompletarCampos(){
    if(!this.cbEstaActivo){
      this.correoElectronico = 'admin-tester@ejemplo.com';
      this.password = '@aSze1234';
    }else{
      this.correoElectronico = '';
      this.password = '';
    }
  }

}
