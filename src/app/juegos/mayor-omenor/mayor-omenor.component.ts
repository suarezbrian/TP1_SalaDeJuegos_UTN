import { Component, inject } from '@angular/core';
import { PanelMenuComponent } from '../../panel-menu/panel-menu.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-mayor-omenor',
  standalone: true,
  imports: [PanelMenuComponent, HttpClientModule],
  templateUrl: './mayor-omenor.component.html',
  styleUrl: './mayor-omenor.component.css'
})
export class MayorOMenorComponent {
  currentCardImageUrl: string = "https://deckofcardsapi.com/static/img/back.png";
  deckId: string = "";
  cartaAnterior: string = "";
  cartaActual: string = "";
  valorJugador: string = "";
  private subscription: Subscription | undefined;

  ngOnInit(){
    this.obtenerCarta();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  constructor(private http: HttpClient) { }

  dibujarCarta() {
    if (this.deckId) {
      this.subscription = this.http.get<any>(`https://deckofcardsapi.com/api/deck/${this.deckId}/draw/?count=1`)
        .subscribe({
          next: response => {  

            this.cartaAnterior = this.cartaActual;   
            this.currentCardImageUrl = response.cards[0].image;
            this.cartaActual = response.cards[0].code;   
            
            this.contarPuntos();

          },
          error: error => {
            console.error('Error al dibujar la carta:', error);
          }
        });
    } else {
      console.error('No hay ID de baraja disponible');
    } 
    
  }

  mesclar(){
    this.http.get<any>(`https://www.deckofcardsapi.com/api/deck/${this.deckId}/shuffle/`)
      .subscribe({
        next: response => {
          console.log('La baraja ha sido mezclada nuevamente:', response);          
        },
        error: error => {
          console.error('Error al volver a mezclar la baraja:', error);
        }
      });
  }


  obtenerCarta(){
    if (!this.deckId) {     
      this.subscription = this.http.get<any>('https://deckofcardsapi.com/api/deck/new')
        .subscribe({
          next: response => {
            this.deckId = response.deck_id;
            this.dibujarCarta();
            this.mesclar(); 
          },
          error: error => {
            console.error('Error al obtener la carta:', error);
          }
        });
    } else {
      this.dibujarCarta();
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

  inicio(valor:string){
    this.valorJugador = valor;
    this.obtenerCarta();
  }

  contarPuntos(){
    if(this.valorJugador === "mayor"){ 
    
      if(this.valorCarta(this.cartaActual) > this.valorCarta(this.cartaAnterior)){
        console.log("ganaste"); //+1
      }else{
        console.log("perdiste"); //-1 vida
      }
    }

    if(this.valorJugador === "menor"){
      if(this.valorCarta(this.cartaActual) < this.valorCarta(this.cartaAnterior)){
        console.log("ganaste");//+1
      }else{
        console.log("perdiste");//-1 vida
      }
    }
  }

}
