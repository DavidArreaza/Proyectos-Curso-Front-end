import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
//import { EventEmitter } from 'stream'; //Este no sirve hay que ponerlo arriba

type Contacts = {
  name: string;
  number: string;
  save: string;
  grupo: string;
};

@Component({
  selector: 'formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  @Input() contact: Contacts = { name : "", number : "", save : "", grupo : "" }; /* Creo el Input para recibir información del padre (app.component) */
  @Output() propagar = new EventEmitter<string>(); /*Creo el Output para enviar al padre (app.component) */

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * Método que envia al padre la información
   */
  enviarPadre() {
    alert("ENTRO HIJO" + this.contact.name);
    this.propagar.emit(this.contact.name);
  }


}
