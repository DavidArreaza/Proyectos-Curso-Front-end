import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms'; /*Copiar aqui */

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FormularioComponent } from './formulario/formulario.component';
import { ListComponent } from './list/list.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FormularioComponent,
    ListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule /* Aqui tambien */
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
