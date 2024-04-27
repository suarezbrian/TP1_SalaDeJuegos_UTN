import { Injectable } from '@angular/core';
import { DocumentData, Firestore, addDoc, collection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class LogsService {

  tablaError = "errores";
  
  constructor(
    private firestore: Firestore,
  ) { }

  guardarLogs(datos:DocumentData, tabla:string){
    let logsCollection = collection(this.firestore, tabla);
    addDoc(logsCollection, datos);
  }

  guardarErrorLogs(msjError:string, tipoError:string){
    let error = collection(this.firestore, this.tablaError);
    addDoc(error, { fecha: new Date(), "error": msjError, "tipo": tipoError});
  }
}
