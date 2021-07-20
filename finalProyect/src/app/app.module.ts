import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BarranavComponent } from './barranav/barranav.component';
import { MenulateralComponent } from './menulateral/menulateral.component';
import { ContentmainComponent } from './contentmain/contentmain.component';
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
import { MispartidasComponent } from './mispartidas/mispartidas.component';
import { BUCKET } from '@angular/fire/storage';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    AppComponent,
    BarranavComponent,
    MenulateralComponent,
    ContentmainComponent,
    DetallesComponent,
    EditperfilComponent,
    AddGamesComponent,
    MispartidasComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAnalyticsModule,
    AngularFirestoreModule,
    FormsModule,
    ReactiveFormsModule,
    NotifierModule.withConfig(),
    FontAwesomeModule,
    BrowserAnimationsModule,
    MatSidenavModule, MatCardModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule
  ],
  providers: [AuthService,
    {provide: BUCKET, useValue: environment.firebase.storageBucket}],
  bootstrap: [AppComponent]
})
export class AppModule { }
