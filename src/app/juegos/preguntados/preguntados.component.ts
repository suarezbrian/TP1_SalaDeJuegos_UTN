import { Component } from '@angular/core';
import { PanelMenuComponent } from '../../panel-menu/panel-menu.component';
import { PreguntadosConfig } from '../../interfaces/preguntados';
import { PreguntadosService } from '../../services/preguntados.service';
import { CommonModule } from '@angular/common';
import { AlertsService } from '../../services/alerts.service';

@Component({
  selector: 'app-preguntados',
  standalone: true,
  imports: [PanelMenuComponent, CommonModule],
  templateUrl: './preguntados.component.html',
  styleUrl: './preguntados.component.css'
})
export class PreguntadosComponent {

  paises: any;
  paisSeleccionado: any;
  cantidadPaises: number = 0;
  rand: number = 0;
  gameConfig: PreguntadosConfig = {
    urlFlag: "",
    preguntaCorrecta: "",
    preguntasIncorrectas: [],
    todasLasRespuesta: []
  };

  preguntas: PreguntadosConfig[] = [];

  cantidadPreguntas: number = 10;
  cantidadOpcionesInco: number = 3;
  contador: number = 0;
  preguntaActual = 0; 
  respuestaSeleccionada: string = "";
  seleccionoRespuesta: boolean = false;
  respuestasIncorrectas: number = 0;
  respuestasCorrectas: number = 0;
  partidaTerminada: boolean = false;
  contadorPreguntas: number = 0;

  constructor(
    private servicePreguntados: PreguntadosService,
    private serviceAlerta: AlertsService
    ) { }

  ngOnInit() {
   this.generarPreguntasJuego();
  }

  generarPreguntasJuego() {
    this.servicePreguntados.obtenerPaises()
    .subscribe(paises => {

      do{
        let gameConfig: PreguntadosConfig = {
          urlFlag: '',
          preguntaCorrecta: '',
          preguntasIncorrectas: [],
          todasLasRespuesta: []
        };

        gameConfig.preguntaCorrecta = this.servicePreguntados.obtenerPaisRandom(paises, paises.length);
        gameConfig.preguntasIncorrectas = this.servicePreguntados.obtenerPaisesIncorrectos(paises, paises.length);
        gameConfig.urlFlag = this.servicePreguntados.obtenerFlagPias(gameConfig.preguntaCorrecta[0].toLocaleLowerCase());
        gameConfig.todasLasRespuesta = [...gameConfig.preguntasIncorrectas.map(p => p[1]), gameConfig.preguntaCorrecta[1]];
        this.shuffle(gameConfig.todasLasRespuesta);
        this.preguntas.push(gameConfig);
        this.contador++;
      } while (this.contador < this.cantidadPreguntas);
      
      console.log(this.preguntas);
      this.contador = 0;
    });     
  }  

  seleccionarRespuesta(respuesta: string) {
    this.respuestaSeleccionada= respuesta;
    this.seleccionoRespuesta = true;
  }

  confirmarRespuesta() {
    if(!this.seleccionoRespuesta) return;

    const respuestaCorrecta = this.preguntas[this.preguntaActual].preguntaCorrecta[1];
    const respuestaSeleccionada = this.respuestaSeleccionada;

    if (respuestaSeleccionada === respuestaCorrecta) {
      this.serviceAlerta.mostrarAlerta(true, "Respuesta correcta!", 1000);
      this.respuestasCorrectas++;
    } else {
      this.serviceAlerta.mostrarAlerta(false, "Respuesta incorrecta!", 1000);
      this.respuestasIncorrectas++;
    }

    if (this.preguntaActual < this.preguntas.length - 1) {
      this.preguntaActual++;
    }
    this.contadorPreguntas++;
    this.seleccionoRespuesta = false;

    this.comprobarFinJuego();
  }

  comprobarFinJuego(){
    if (this.contadorPreguntas === this.cantidadPreguntas) {
      this.partidaTerminada = true;
      this.serviceAlerta.mostrarAlertaMidSucces("Partida Terminada!", "Has conseguido : " + this.respuestasCorrectas + " respuestas correctas y " + this.respuestasIncorrectas + " respuestas incorrectas");
    }
  }

  reset(){
    this.respuestasCorrectas = 0;
    this.respuestasIncorrectas = 0;
    this.seleccionoRespuesta = false;
    this.preguntas = [];
    this.partidaTerminada = false;
    this.contadorPreguntas = 0;
    this.generarPreguntasJuego();
  }

  shuffle(array: any[]): any[] {
    let currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }
}
