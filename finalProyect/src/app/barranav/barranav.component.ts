import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'barranav',
  templateUrl: './barranav.component.html',
  styleUrls: ['./barranav.component.css']
})
export class BarranavComponent implements OnInit {

  pulsado = false;

  constructor() { }

  ngOnInit(): void {
  }

  esPulsado(){
    if(!this.pulsado){
      this.pulsado = true;
    }else{
      this.pulsado = false;
    }
    console.log(this.pulsado);
  }

}
