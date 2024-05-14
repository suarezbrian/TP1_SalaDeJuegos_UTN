import { Component, inject } from '@angular/core';
import { PanelMenuComponent } from '../../panel-menu/panel-menu.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Subscription, firstValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';
import { SharedService } from '../../shared.service';
import { Usuario } from '../../interfaces/usuario';

@Component({
  selector: 'app-mayor-omenor',
  standalone: true,
  imports: [PanelMenuComponent, HttpClientModule, CommonModule],
  templateUrl: './mayor-omenor.component.html',
  styleUrl: './mayor-omenor.component.css'
})
export class MayorOMenorComponent {
  currentCardImageUrl: string = "https://deckofcardsapi.com/static/img/back.png";
  deckId: string = "";
  cartaAnterior: string = "";
  cartaActual: string = "";
  valorJugador: string = "";
  nombreUsuario: string = "";
  subscription!: Subscription;
  usuarioLogeado: Usuario | null = null;
  datosUsuario: Usuario[] = [];
  puntos: number = 0;
  intentos: number = 3;
  intentosPerdidos: number =0;
  mensajeFinal: string = "";
  botonReset: string = "";
  juegoTerminado: boolean = false;;   

  constructor(
    private http: HttpClient,
    private sharedService: SharedService) { }

  ngOnInit(){
    this.obtenerNuevaBaraja();

    this.subscription = this.sharedService.usuarioLogeado$.subscribe(usuario => {
      this.usuarioLogeado = usuario;
      this.datosUsuario = [];
      this.usuarioLogeado?this.datosUsuario.push(this.usuarioLogeado):this.datosUsuario = [];
      
      if(this.datosUsuario.length > 0){
        this.nombreUsuario = this.datosUsuario[0].usuario;
      }
      
    });
  }

  async obtenerNuevaBaraja() {
    const response = await firstValueFrom(this.http.get<any>('https://deckofcardsapi.com/api/deck/new'));
    this.deckId = response.deck_id;
    await this.mezclarBaraja();
    await this.dibujarCarta();
  }

  async dibujarCarta() {
    if (this.deckId) {
      const response = await firstValueFrom(this.http.get<any>(`https://deckofcardsapi.com/api/deck/${this.deckId}/draw/?count=1`));
      this.cartaAnterior = this.cartaActual;   
      this.currentCardImageUrl = response.cards[0].image;
      this.cartaActual = response.cards[0].code;
    } else {
      console.error('No hay ID de baraja disponible');
    }
  }

  async mezclarBaraja() {
    await firstValueFrom(this.http.get<any>(`https://www.deckofcardsapi.com/api/deck/${this.deckId}/shuffle/`));
  }

  async obtenerCarta() {
    if (!this.deckId) {
      await this.obtenerNuevaBaraja();
    } else {
      await this.dibujarCarta();
      this.contarPuntos();
    }
  }

  valorCarta(carta: string): number {
    const valor = carta.substring(0, carta.length - 1);
    switch (valor) {
      case 'A':
        return 11;
      case 'J':
      case 'Q':
      case 'K':
        return 10;
      default:
        return parseInt(valor);
    }
  }

  async inicio(valor: string) {
    this.valorJugador = valor;
    await this.obtenerCarta();
  }

  contarPuntos() {
    console.log(this.cartaAnterior);
    if (this.cartaAnterior === ""){
       return;
    }

    const valorActual = this.valorCarta(this.cartaActual);
    const valorAnterior = this.valorCarta(this.cartaAnterior);

    if (this.valorJugador === "mayor") {
      if (valorActual > valorAnterior) {
        this.puntos++;
      } else {
        this.intentosPerdidos++;
        this.intentos--;
        this.compruebaFin();
      }
    } else if (this.valorJugador === "menor") {
      if (valorActual < valorAnterior) {
        this.puntos++;
      } else {
        this.intentosPerdidos++;
        this.intentos--;
        this.compruebaFin();
      }
    }
  }

  compruebaFin() {
    if (this.intentosPerdidos === 3) {
      this.mensajeFinal = 'Partida Terminada!';
      this.botonReset = 'Reset';
      this.juegoTerminado = true;  
      console.log("juego terminado"); 
    } else if (this.intentosPerdidos < 3) {
      return;
    }
  }

  reset(){
    this.puntos = 0;
    this.intentos = 3;
    this.intentosPerdidos = 0;
    this.mensajeFinal = "";
    this.botonReset = "";
    this.juegoTerminado = false;
    this.cartaAnterior = "";
    this.obtenerNuevaBaraja();
  }

}
