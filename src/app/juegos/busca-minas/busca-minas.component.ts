import { Component } from '@angular/core';
import { PanelMenuComponent } from '../../panel-menu/panel-menu.component';
import { CommonModule } from '@angular/common';
import { DificultadConfig } from '../../interfaces/configBuscaMinas';

enum Dificultad{

  Facil,
  Normal, 
  Dificil

}

@Component({
  selector: 'app-busca-minas',
  standalone: true,
  imports: [PanelMenuComponent, CommonModule],
  templateUrl: './busca-minas.component.html',
  styleUrl: './busca-minas.component.css'
})
export class BuscaMinasComponent {

  gameConfig: { [key in Dificultad]: DificultadConfig } = {
    [Dificultad.Facil]: {
      texto: "Facil",
      casillas: 10,
      minas: 5,
      banderas: 5
    },
    [Dificultad.Normal]: {
      texto: "Normal",
      casillas: 12,
      minas: 10,
      banderas: 10
    },
    [Dificultad.Dificil]: {
      texto: "Dificil",
      casillas: 15,
      minas: 20,
      banderas: 20
    }
  };

  tablero: { valor: number, revelada: boolean, esMina: boolean, bandera: boolean }[][] = [];
  cantidadMinas: number = 0;
  botonDificultad: string = this.gameConfig[Dificultad.Dificil].texto;
  botonEmpezar: string = "Comenzar!";
  dificultadSeleccionada!: DificultadConfig;
  fila: number = 0;
  columna: number = 0;
  activarJuego: boolean = false;
  juegoTerminado: boolean = false;
  botonReset: string = "Volver a comenzar!"
  minasRestantes: number = 0;
  casillasRestantes: number = 0;
  cantidadBanderas: number= 0;
  minutos: number = 0;
  segundos: number = 0;
  timerRef: any;
  textoFinal: string = "";

  ngOnInit(){
    this.cambiarDificultad();
  }

  ngOnDestroy() {
    this.detenerTimer();
  }

  iniciarTimer() {
    this.timerRef = setInterval(() => {
      this.segundos++;
      if (this.segundos === 60) {
        this.segundos = 0;
        this.minutos++;
      }
    }, 1000);
  }

  detenerTimer() {
    clearInterval(this.timerRef);
  }

  inicializarTablero() {  
    const casillas = this.dificultadSeleccionada.casillas; 
    this.tablero = [];

    for (let i = 0; i < casillas; i++) {
      this.tablero[i] = [];
      for (let j = 0; j < casillas; j++) {
        this.tablero[i][j] = { valor: 0, revelada: false, esMina: false, bandera: false };
      }
    }

    this.minasRestantes = this.dificultadSeleccionada.minas;
    this.cantidadBanderas = this.dificultadSeleccionada.banderas;
  }


  ponerMinas() {
    const casillas = this.dificultadSeleccionada.casillas;
    const cantidadMinas = this.dificultadSeleccionada.minas;
    let minasColocadas = 0;

    while (minasColocadas < cantidadMinas) {
      const fila = Math.floor(Math.random() * casillas);
      const columna = Math.floor(Math.random() * casillas);

      if (!this.tablero[fila][columna].esMina) {
        this.tablero[fila][columna] = { valor: -1, revelada: false, esMina: true, bandera: false };
        minasColocadas++;
      }
    }
  }

  calcularCasillasMinas() {
    const casillas = this.dificultadSeleccionada.casillas;

    for (let i = 0; i < casillas; i++) {
      for (let j = 0; j < casillas; j++) {
        if (this.tablero[i][j].valor === -1) {
          this.incrementarCasilla(i - 1, j);
          this.incrementarCasilla(i + 1, j);
          this.incrementarCasilla(i, j - 1);
          this.incrementarCasilla(i, j + 1);
          this.incrementarCasilla(i - 1, j - 1);
          this.incrementarCasilla(i + 1, j - 1);
          this.incrementarCasilla(i - 1, j + 1);
          this.incrementarCasilla(i + 1, j + 1);
        }
      }
    }
  }

  incrementarCasilla(fila: number, columna: number) {
    
    const casillas = this.dificultadSeleccionada.casillas;
    if (fila >= 0 && fila < casillas && columna >= 0 && columna < casillas && this.tablero[fila][columna].valor !== -1) {
      this.tablero[fila][columna].valor++;
    }
  }

  calcularDificultad(){  
    this.inicializarTablero();  
    this.ponerMinas(); 
    this.calcularCasillasMinas();   
    this.casillasRestantes =   this.calcularCasillasLibres() - 1;   
  }

  calcularCasillasLibres(): number {
    let casillasLibres = 0;
    const casillas = this.dificultadSeleccionada.casillas;
  
    for (let i = 0; i < casillas; i++) {
      for (let j = 0; j < casillas; j++) {
        const casilla = this.tablero[i][j];
        if (!casilla.revelada && !casilla.bandera) {
          if (casilla.valor === 0 || (casilla.valor > 0 && casilla.valor !== -1)) {
            casillasLibres++;
          }
        }
      }
    }
  
    return casillasLibres;
  }

  cambiarDificultad(){
    
    switch(this.botonDificultad){
      case this.gameConfig[Dificultad.Facil].texto:
        this.botonDificultad = this.gameConfig[Dificultad.Normal].texto;
        this.dificultadSeleccionada = this.gameConfig[Dificultad.Normal];
        break;
      case this.gameConfig[Dificultad.Normal].texto:
        this.botonDificultad = this.gameConfig[Dificultad.Dificil].texto;
        this.dificultadSeleccionada = this.gameConfig[Dificultad.Dificil];
        break;
      case this.gameConfig[Dificultad.Dificil].texto:
        this.botonDificultad = this.gameConfig[Dificultad.Facil].texto;
        this.dificultadSeleccionada = this.gameConfig[Dificultad.Facil];
        break;
      default:
        this.botonDificultad = this.gameConfig[Dificultad.Facil].texto;
        this.dificultadSeleccionada = this.gameConfig[Dificultad.Facil];
        break;      
    }
    this.calcularDificultad();
  }

  buscarEspaciosVacios(fila: number, columna: number) {
    const casillas = this.dificultadSeleccionada.casillas;

    let colaBusqueda: { fila: number, columna: number }[] = [];
    colaBusqueda.push({ fila, columna });

    while (colaBusqueda.length > 0) {
      const { fila, columna } = colaBusqueda.shift()!;
      
      const direcciones = [
        { df: -1, dc: 0 },
        { df: 1, dc: 0 }, 
        { df: 0, dc: -1 },
        { df: 0, dc: 1 } 
      ];

      for (const dir of direcciones) {
        const nuevaFila = fila + dir.df;
        const nuevaColumna = columna + dir.dc;

        if (nuevaFila >= 0 && nuevaFila < casillas && nuevaColumna >= 0 && nuevaColumna < casillas) {
          if (!this.tablero[nuevaFila][nuevaColumna].revelada && !this.tablero[nuevaFila][nuevaColumna].bandera) {
            this.tablero[nuevaFila][nuevaColumna].revelada = true;
            this.casillasRestantes--;
            
            if (this.tablero[nuevaFila][nuevaColumna].valor === 0) {
              colaBusqueda.push({ fila: nuevaFila, columna: nuevaColumna });
            }
          }
        }
      }
    }
  }

  seleccionarCasilla(fila: number, columna: number){  
    if(!this.activarJuego) return;
    if(this.juegoTerminado) return;
    if(this.tablero[fila][columna].bandera) return;

    this.casillasRestantes =   this.calcularCasillasLibres() - 1;

    if(this.casillasRestantes == 0){
      this.juegoTerminado = true;
      this.tablero[fila][columna].revelada = true;
      this.detenerTimer();
      this.textoFinal = "Has Ganado!";
      return;
    }

    if(this.tablero[fila][columna].valor == -1){
      this.juegoTerminado = true;
      this.tablero[fila][columna].revelada = true;
      this.detenerTimer();
      this.mostrarMinas();
      this.textoFinal = "Has Perdido!";
    }
    if(this.tablero[fila][columna].valor == 0){       
      this.tablero[fila][columna].revelada = true;   
      this.buscarEspaciosVacios(fila,columna);      
    }else{
      this.tablero[fila][columna].revelada = true;
    }

  }

  empezarJuego(){
    this.activarJuego = true;
    this.iniciarTimer();
  }

  mostrarMinas(){
    const casillas = this.dificultadSeleccionada.casillas; 
    for (let i = 0; i < casillas; i++) {
      for (let j = 0; j < casillas; j++) {
        if(this.tablero[i][j].esMina){
          this.tablero[i][j].revelada = true;
        }
      }
    }
  }

  reset(){
    this.juegoTerminado = false;
    this.activarJuego = false;
    this.minutos = 0;
    this.segundos = 0;
    this.timerRef = 0;
    this.dificultadSeleccionada = this.gameConfig[Dificultad.Facil];
    this.botonDificultad = this.dificultadSeleccionada.texto;
    this.calcularDificultad();
  }

  ponerBandera(event: MouseEvent, fila: number, columna: number) {
    if(!this.activarJuego) return;
    if(this.juegoTerminado) return;
    
    event.preventDefault(); 

    if(this.tablero[fila][columna].bandera){
      this.tablero[fila][columna].bandera = false;
      this.cantidadBanderas++;
    }else{
      if(this.cantidadBanderas <= 0)return;
      this.tablero[fila][columna].bandera = true;
      this.cantidadBanderas--;
    }
  }
}
