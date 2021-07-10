import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BarranavComponent } from './barranav/barranav.component';
import { MenulateralComponent } from './menulateral/menulateral.component';
import { ContentmainComponent } from './contentmain/contentmain.component';
import { LoginComponent } from './login/login.component';
import { DetallesComponent } from './detalles/detalles.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AuthService } from './shared/services/auth.service';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { EditperfilComponent } from './editperfil/editperfil.component';
import { AddGamesComponent } from './add-games/add-games.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotifierModule } from 'angular-notifier';
//import { DetailsComponent } from './details/details.component';

@NgModule({
  declarations: [
    AppComponent,
    BarranavComponent,
    MenulateralComponent,
    ContentmainComponent,
    LoginComponent,
    DetallesComponent,
    EditperfilComponent,
    AddGamesComponent,
    //DetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAnalyticsModule,
    AngularFirestoreModule,
    FormsModule,
    ReactiveFormsModule,
    NotifierModule.withConfig()
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
