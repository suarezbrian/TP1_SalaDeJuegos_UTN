import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  constructor() { }

  configuracionAlerta(tipo: boolean, mensaje: string, duracion: number) {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: duracion,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });  
    Toast.fire({
      icon: tipo ? "success": "error",
      title: mensaje,
    });
  }  
  
  mostrarAlerta(tipo: boolean, mensaje: string, duracion:number) {
    this.configuracionAlerta(tipo, mensaje, duracion);
  }
}
