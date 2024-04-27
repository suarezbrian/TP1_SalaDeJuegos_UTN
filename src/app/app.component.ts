import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { Usuario } from './interfaces/usuario';
import { SharedService } from './shared.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'TP1_Labo4_SuarezBrianAlan';

  usuarioLogeado: Usuario | null = null;

  constructor(
    private sharedService: SharedService
  ){

  }

  ngOnInit(): void {

    const usuarioLogeadoString = localStorage.getItem('usuarioLogeado');
    
    if (usuarioLogeadoString) {
      this.usuarioLogeado = JSON.parse(usuarioLogeadoString);
      this.sharedService.estaLogeado = true;
      this.sharedService.usuarioLogeado = this.usuarioLogeado;
    }
  }

}
