import { Component } from '@angular/core';
import { PanelMenuComponent } from '../../panel-menu/panel-menu.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ahorcado',
  standalone: true,
  imports: [PanelMenuComponent,CommonModule],
  templateUrl: './ahorcado.component.html',
  styleUrl: './ahorcado.component.css'
})
export class AhorcadoComponent {
  palabras: [string, string][] = [
    ["atlantico", "Un océano"], ["ordenador", "Una máquina"], ["laurel", "Un árbol"], ["plaza", "Espacio público"],
    ["rueda", "Gran invento"], ["cereza", "Una fruta"], ["petanca", "Un juego"], ["higuera", "Un árbol"],
    ["everest", "Un monte"], ["relampago", "Antecede al trueno"], ["jirafa", "Un animal"], ["luxemburgo", "Un país"],
    ["uruguay", "Un país"], ["ilustracion", "Representación gráfica"], ["excursion", "Actividad en la naturaleza"],
    ["empanadilla", "De la panadería"], ["pastel", "De la pastelería"], ["colegio", "Lugar para estudiar"],
    ["carrera", "Competición"], ["mermelada", "Confitura"]
  ];
  palabraOculta: string = '';
  rand: number = 0;
  oculta: string[] = [];
  hueco: HTMLElement | null = null;
  cont: number = 6;
  abecedario: string[] = [];
  letrasUsadas: Set<string> = new Set();
  mensajeAcierto: string = '';
  mensajeFinal: string = '';
  intentos: number = 6;
  pistaTexto: string = '';
  botonReset: string = 'Elegir otra palabra';
  juegoTerminado: boolean = false;

  
  ngOnInit() {
    this.inicio();
  }

  generaPalabra() {
    this.rand = Math.floor(Math.random() * this.palabras.length);
    this.palabraOculta = this.palabras[this.rand][0].toUpperCase();
    console.log(this.palabraOculta);
  }

  pintarGuiones(num: number) {
    this.oculta = Array(num).fill('_');
  }

  generaABC(a: string, z: string) {
    this.abecedario = [];
    for (let i = a.charCodeAt(0); i <= z.charCodeAt(0); i++) {
      this.abecedario.push(String.fromCharCode(i).toUpperCase());
    }
    this.abecedario.push('Ñ');
  }

  intento(letra: string) {

    if (this.juegoTerminado) {
      this.inicio();
      return;
    }

    this.letrasUsadas.add(letra);
    if (this.palabraOculta.indexOf(letra) !== -1) {
      for (let i = 0; i < this.palabraOculta.length; i++) {
        if (this.palabraOculta[i] === letra) this.oculta[i] = letra;
      }
      this.mensajeAcierto = '¡Bien!';
    } else {
      this.intentos--;
      this.mensajeAcierto = '¡Fallo!';
    }
    this.compruebaFin();
  }

  mostrarPista() {
    this.pistaTexto = this.palabras[this.rand][1];
  }

  compruebaFin() {
    if (this.oculta.indexOf('_') === -1) {
      this.mensajeFinal = '¡Felicidades!';
      this.botonReset = 'Empezar';
      this.juegoTerminado = true;
    } else if (this.intentos === 0) {
      this.mensajeFinal = 'Game Over';
      this.botonReset = 'Empezar';
      this.juegoTerminado = true;    
    }
  }

  inicio() {
    this.generaPalabra();
    this.pintarGuiones(this.palabraOculta.length);
    this.generaABC('a', 'z');
    this.letrasUsadas.clear();
    this.intentos = 6;
    this.mensajeFinal = '';
    this.mensajeAcierto = '';
    this.pistaTexto = '';
    this.botonReset = 'Elegir otra palabra';
  }
}
