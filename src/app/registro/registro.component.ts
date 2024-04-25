import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SharedService } from '../shared.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent implements OnInit{
  cbEstaActivo: boolean = false;
  nombreUsuario: string = '';
  confirmarPassword: string = '';
  password: string = '';
  correoElectronico: string = '';

  registroFormAbierto: boolean = false;

  constructor(private sharedService: SharedService) { }

  ngOnInit() {
    this.sharedService.formAbierto$.subscribe(estaAbierto => {
      this.registroFormAbierto = estaAbierto;
    });
  }

  closeRegistroForm(){
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

}
