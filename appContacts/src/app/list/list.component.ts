import { ConvertActionBindingResult } from '@angular/compiler/src/compiler_util/expression_converter';
import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';

type Contacts = {
  name: string;
  number: string;
  save: string;
  grupo: string;
};


@Component({
  selector: 'list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})


export class ListComponent implements OnInit {
  @Input() contact: Contacts = { name : "", number : "", save : "", grupo : ""};
  @Output() propagar = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void { }

  selectDeleteTrue(){}

  nombre = '';

  /**
   * Coge el nombre y lo envia
   */
  getNombre(){
    alert('Envio ' + this.nombre); //Nombre a enviar
    this.propagar.emit(this.nombre);
  }

}
