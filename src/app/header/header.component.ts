import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { SharedService } from '../shared.service';
import { RegistroComponent } from '../registro/registro.component';
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

  constructor(private sharedService: SharedService) { }

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



}
