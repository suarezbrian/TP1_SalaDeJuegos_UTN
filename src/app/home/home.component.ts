import { Component, ElementRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PanelMenuComponent } from '../panel-menu/panel-menu.component';
import { CommonModule } from '@angular/common';
import { SharedService } from '../shared.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, PanelMenuComponent, CommonModule, LoginComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent{

  estaLogeado: boolean = true;
  mostrarLoginPopup: boolean = false;

  constructor(
    private sharedService: SharedService
  ){}
  
  ngOnInit() {
    this.sharedService.estaLogeado$.subscribe(estaLogeado => {
      this.estaLogeado = estaLogeado;
    }); 
  }

  openLoginPopup() {
    this.sharedService.formAbierto = true;
    this.mostrarLoginPopup = true;
  }
}
