import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { PreguntadosConfig } from '../interfaces/preguntados';

@Injectable({
  providedIn: 'root'
})

export class PreguntadosService {
  rand: number = 0;
  gameConfig!: PreguntadosConfig[];

  constructor(private http: HttpClient) { }

  obtenerPaises() {
    return this.http.get<any[]>('https://restcountries.com/v3.1/all')
    .pipe(map(paises => paises.sort((a,b) => {
        if (a.name.common < b.name.common) {
          return -1;
        } else if (a.name.common > b.name.common) {
          return 1;
        } else {
          return 0;
        }
      })));
  }

  obtenerPaisRandom(paises: any, cantidadPaises: number){
    let paisSeleccionado: any;
    do{
      this.rand = Math.floor(Math.random() * cantidadPaises);
      paisSeleccionado = paises[this.rand].altSpellings;
    }while(paisSeleccionado.length <= 1);

    return paisSeleccionado;
  }

  obtenerPaisesIncorrectos(paises: any, cantidadPaises: number){
    let paisSeleccionado: any[]=[];
    let cantidad = 0;
    do{
      this.rand = Math.floor(Math.random() * cantidadPaises);

      if(paises[this.rand].altSpellings.length > 1){

        paisSeleccionado.push(paises[this.rand].altSpellings);
        cantidad++;

      }
      
    }while(cantidad < 4);
    cantidad = 0;
    return paisSeleccionado;
  }

  obtenerFlagPias(pais: string){
    const url = 'https://flagpedia.net/data/flags/h240/';
    return url + pais + ".png";    
  }

}
