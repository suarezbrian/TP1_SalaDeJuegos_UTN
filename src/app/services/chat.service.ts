import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, limit, onSnapshot, orderBy, query } from '@angular/fire/firestore';
import { Observable, Subject } from 'rxjs';
import { Mensaje } from '../interfaces/mensaje';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(
    private firestore: Firestore
  ) { }

  guardarUsuario(text: string, nombreUsuario: string) {
    try {

      const msgData = {
        text: text,
        usuario: nombreUsuario,
        fecha: new Date(),
      };

      const msgCollection = collection(this.firestore, 'mensajes');
      addDoc(msgCollection, msgData);
    } catch (error) {
      console.error('Error al guardar los datos del mensaje:', error);
      throw error;
    }
  }

  obtenerUltimoMensaje(): Observable<Mensaje | null> {
    const mensajesCollection = collection(this.firestore, 'mensajes');
    const mensajesQuery = query(mensajesCollection, orderBy('fecha', 'desc'), limit(1));
  
    return new Observable<Mensaje | null>((observer) => {
      const unsubscribe = onSnapshot(mensajesQuery, (snapshot) => {
        if (snapshot.docs.length > 0) {
          const ultimoMensajeData = snapshot.docs[0].data();
          const ultimoMensaje: Mensaje = {
            text: ultimoMensajeData['text'],
            nombreUsuario: ultimoMensajeData['usuario'],
            fecha: ultimoMensajeData['fecha'].toDate()
          };
          observer.next(ultimoMensaje);
        } else {
          observer.next(null); 
        }
      });
      
      return () => unsubscribe();
    });
  }


}
