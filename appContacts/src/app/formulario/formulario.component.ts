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

  nombre = '';
  numero = '';
  sav = '';
  grup = '';

  @Input() contact: Contacts = { name : "", number : "", save : "", grupo : "" };
  @Output() propagar = new EventEmitter<object>(); /*Creo el Output */
  

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * Método que envia al padre la información
   */
  enviarPadre() {
    //alert("ENTRO HIJO")
    this.propagar.emit(this.contact);
  }


}
