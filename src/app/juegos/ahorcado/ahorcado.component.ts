import {  Component } from '@angular/core';
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
    ["oceano", "Gran masa de agua salada"], ["biblioteca", "Lugar con muchos libros"], ["astronauta", "Persona que viaja al espacio"],
    ["microscopio", "Instrumento para ver cosas muy pequeñas"], ["telescopio", "Instrumento para observar estrellas"],
    ["traduccion", "Conversión de un texto a otro idioma"], ["volcan", "Montaña con actividad sísmica"], ["electricidad", "Forma de energía"],
    ["hamburguesa", "Comida rápida con carne"], ["jardin", "Espacio con plantas y flores"], ["granizo", "Precipitación de bolas de hielo"],
    ["huracan", "Tormenta con vientos muy fuertes"], ["pelota", "Objeto esférico usado en juegos"], ["medicina", "Ciencia de curar enfermedades"],
    ["nube", "Acumulación de gotas de agua en el cielo"], ["estrella", "Cuerpo celeste que brilla en el cielo"], ["pajaro", "Animal que vuela"],
    ["periodico", "Publicación de noticias"], ["gimnasio", "Lugar para hacer ejercicio"], ["banco", "Entidad financiera"],
    ["carretera", "Vía para vehículos"], ["ventana", "Abertura en la pared para dejar entrar luz"],
    ["puerta", "Abertura que permite el paso"], ["ciudad", "Gran población urbana"], ["desierto", "Lugar seco con poca vegetación"],
    ["mariposa", "Insecto con alas coloridas"], ["pintura", "Arte de representar imágenes con colores"], ["teclado", "Conjunto de teclas de un ordenador"],
    ["guitarra", "Instrumento musical de cuerda"], ["orquesta", "Conjunto de músicos"], ["telefono", "Dispositivo para comunicarse a distancia"],
    ["tren", "Vehículo que circula sobre rieles"], ["avion", "Medio de transporte aéreo"], ["piramide", "Construcción con base cuadrada y lados triangulares"],
    ["parque", "Espacio verde en la ciudad"], ["torre", "Construcción alta y estrecha"], ["museo", "Lugar donde se exhiben obras de arte"],
    ["rio", "Corriente natural de agua"], ["relampago", "Fenómeno natural antes del trueno"], ["bicicleta", "Vehículo de dos ruedas"],
    ["caballo", "Animal utilizado para montar"], ["pizarra", "Lugar donde se escribe con tiza"],
    ["helado", "Postre frío y dulce"], ["estadio", "Lugar donde se celebran eventos deportivos"], ["casa", "Lugar donde vive una familia"],
    ["murcielago", "Mamífero que vuela"], ["internet", "Red global de comunicación"], ["escalera", "Elemento para subir o bajar entre niveles"]
  ];

  palabraOculta: string = "";
  rand: number = 0;
  oculta: { letra: string, descubierta: boolean }[] = [];
  hueco: HTMLElement | null = null;
  abecedario: string[] = [];
  letrasUsadas: Set<string> = new Set();
  mensajeAcierto: string = ""
  mensajeFinal: string = "";
  intentos: number = 6;
  pistaTexto: string = "";
  botonReset: string = "Elegir otra palabra";
  juegoTerminado: boolean = false;
  dificultadJuego: string = "Normal"
  
  ngOnInit() {
    this.inicio();
  }

  generaPalabra() {
    this.rand = Math.floor(Math.random() * this.palabras.length);
    this.palabraOculta = this.palabras[this.rand][0].toUpperCase();
    console.log(this.palabraOculta);
  }

  pintarGuiones(num: number) {
    this.oculta = Array(num).fill({ letra: '_', descubierta: false });
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
        if (this.palabraOculta[i] === letra) this.oculta[i] = { letra, descubierta: true };
      }
    } else {
      this.intentos--;
    }
    this.compruebaFin();
  }

  mostrarPista() {
    this.pistaTexto = this.palabras[this.rand][1];
  }

  compruebaFin() {
    if (this.oculta.every(item => item.descubierta)) {
      this.mensajeFinal = '¡Felicidades Ganaste!';
      this.botonReset = 'Reset';
      this.juegoTerminado = true;
    } else if (this.intentos === 0) {
      this.mensajeFinal = 'Perdiste!';
      this.botonReset = 'Reset';
      this.juegoTerminado = true;
      this.mostrarPalabra();
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
    this.juegoTerminado = false;  
  }

  obtenerImagenSrc(intentos: number): string {
    const imagenes = [
      "../../../assets/ahorcado/ahorcado_0.png",
      "../../../assets/ahorcado/ahorcado_1.png",
      "../../../assets/ahorcado/ahorcado_2.png",
      "../../../assets/ahorcado/ahorcado_3.png",
      "../../../assets/ahorcado/ahorcado_4.png",
      "../../../assets/ahorcado/ahorcado_5.png",
      "../../../assets/ahorcado/ahorcado_6.png"
    ];

    if (intentos >= imagenes.length) {
      return imagenes[imagenes.length - 1];
    }

    if (intentos < 0) {
      return '';
    }

    return imagenes[intentos];
  }

  mostrarPalabra() {
    if (this.juegoTerminado) {
      this.oculta = this.oculta.map((item, index) => {
        if (item.letra === '_') {
          return { letra: this.palabraOculta[index], descubierta: false };
        }
        return item;
      });
    }
  }
}
