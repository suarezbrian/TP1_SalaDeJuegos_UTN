import { CommonModule } from '@angular/common';
import { Component, ElementRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Subscribable, Subscription } from 'rxjs';
import { SharedService } from '../shared.service';
import { Usuario } from '../interfaces/usuario';

@Component({
  selector: 'app-panel-menu',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './panel-menu.component.html',
  styleUrl: './panel-menu.component.css'
})
export class PanelMenuComponent {

  nombreUsuario: string = "Usuario";
  datosUsuario: Usuario[] = [];
  estaLogeado: boolean = true;
  subscription!: Subscription;
  usuarioLogeado: Usuario | null = null;
  
  constructor(
    private sharedService: SharedService
  ){}

  ngOnInit() {
    this.sharedService.estaLogeado$.subscribe(estaLogeado => {
      this.estaLogeado = estaLogeado;
    }); 

    this.subscription = this.sharedService.usuarioLogeado$.subscribe(usuario => {
      this.usuarioLogeado = usuario;
      this.datosUsuario = [];
      this.usuarioLogeado?this.datosUsuario.push(this.usuarioLogeado):this.datosUsuario = [];
      
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
}
