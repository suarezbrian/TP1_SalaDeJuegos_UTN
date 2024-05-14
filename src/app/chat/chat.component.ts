import { Component } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { SharedService } from '../shared.service';
import { Subscription } from 'rxjs';
import { Usuario } from '../interfaces/usuario';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {

  nombreUsuario: string = "";
  message: string = "";
  subscription!: Subscription;
  usuarioLogeado: Usuario | null = null;
  datosUsuario: Usuario[] = [];
  messages: any[] = [];
  fecha!: Date;
  
  constructor(
    private chatService: ChatService,
    private sharedService: SharedService
    ) {this.fecha = new Date();}

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  
  ngOnInit() {

    this.subscription = this.sharedService.usuarioLogeado$.subscribe(usuario => {
      this.usuarioLogeado = usuario;
      this.datosUsuario = [];
      this.usuarioLogeado?this.datosUsuario.push(this.usuarioLogeado):this.datosUsuario = [];
      
      if(this.datosUsuario.length > 0){
        this.nombreUsuario = this.datosUsuario[0].usuario;
      }
      
    });


    this.chatService.obtenerUltimoMensaje().subscribe(mensaje => {
     
      if((mensaje?.fecha?.getTime() ?? 0) > this.fecha.getTime()){
        if(this.nombreUsuario != mensaje?.nombreUsuario){
        console.log("Servicio :", mensaje);
        this.messages.push({ text: mensaje?.text,fecha: new Date(),nombreUsuario: mensaje?.nombreUsuario, type: 'left' });
        this.messages.sort((a, b) => a.timestamp - b.timestamp); 
        }
      }
    });
      
    

  }

  enviarMensaje() {
    
    this.chatService.guardarUsuario(this.message, this.nombreUsuario);
    this.messages.push({ text: this.message,fecha: new Date(),nombreUsuario: this.nombreUsuario, type: 'right' }); 
    this.messages.sort((a, b) => a.timestamp - b.timestamp); 
    this.message = "";
  }
}
