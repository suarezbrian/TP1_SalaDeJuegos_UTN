import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {


  //FORM - BOOL
  private _formAbierto: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  formAbierto$ = this._formAbierto.asObservable();

  get formAbierto(): boolean {
    return this._formAbierto.getValue();
  }

  set formAbierto(value: boolean) {
    this._formAbierto.next(value);
  }

}
