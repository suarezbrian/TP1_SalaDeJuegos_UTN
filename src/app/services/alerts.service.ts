import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  private colaDeAlertas: (() => void)[] = [];
  private alertaActiva: boolean = false;

  constructor() { }

  configuracionAlerta(tipo: boolean, mensaje: string, duracion: number) {
    const alertFunction = () => {
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
      }).then(() => {
        
        this.alertaActiva = false;
        if (this.colaDeAlertas.length > 0) {
          const nextAlert = this.colaDeAlertas.shift();
          if (nextAlert) {
            nextAlert();
          }
        }
      });
    };

    if (this.alertaActiva) {
      this.colaDeAlertas.push(alertFunction);
    } else {      
      this.alertaActiva = true;
      alertFunction();
    }
  }
  
  mostrarAlerta(tipo: boolean, mensaje: string, duracion:number) {
    this.configuracionAlerta(tipo, mensaje, duracion);
  }
}
