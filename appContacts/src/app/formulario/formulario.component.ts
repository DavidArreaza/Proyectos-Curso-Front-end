import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
//import { EventEmitter } from 'stream'; //Este no sirve hay que ponerlo arriba

type Contacts = {
  name: string;
  number: string;
  save: string;
  grupo: string;
  selectDelete: false
};

type Nombre = string;

@Component({
  selector: 'formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  @Input() contact: Contacts = { name : "", number : "", save : "", grupo : "", selectDelete: false }; /* Creo el Input para recibir información del padre (app.component) */
  @Output() propagar = new EventEmitter<object>(); /*Creo el Output para enviar al padre (app.component) */


  @Input() nombreContanto : Nombre = '';
  constructor() { }

  ngOnInit(): void {
  }

  /**
   * Método que envia al padre la información
   * para añadir a la lista
   */
  add() {
    this.propagar.emit(this.contact);
  }

  /**
   * Método que envia al padre la información
   * para eliminar de la lista
   */
  sendDelete(){
    //this.propagar.emit();
    alert(this.nombreContanto);
  }

  //this.variable.filter(variableNueva => varibale.name != name); //para elimar

}
