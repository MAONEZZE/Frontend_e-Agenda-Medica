import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  @Output() onEnviarData: EventEmitter<any> = new EventEmitter();
  @Output() onEnviarlista: EventEmitter<any> = new EventEmitter();
  
  constructor() { }




}
