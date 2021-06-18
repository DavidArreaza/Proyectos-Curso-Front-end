import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BarranavComponent } from './barranav/barranav.component';
import { MenulateralComponent } from './menulateral/menulateral.component';

@NgModule({
  declarations: [
    AppComponent,
    BarranavComponent,
    MenulateralComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
