import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MenulateralComponent } from './menulateral/menulateral.component';
import { ContentmainComponent } from './contentmain/contentmain.component';
import { LoginComponent } from './login/login.component';

import { DetallesComponent } from './detalles/detalles.component';
import { AuthGuard } from './shared/guard/auth.guard';
import { EditperfilComponent } from './editperfil/editperfil.component';
import { AddGamesComponent } from './add-games/add-games.component';
import { MispartidasComponent } from './mispartidas/mispartidas.component';

const routes: Routes = [
  {path: '', component: ContentmainComponent, pathMatch: "full"},
  {path: 'home/:id', component: ContentmainComponent, canActivate: [AuthGuard]},
  //{path: 'sidebar', component: MenulateralComponent}
  //{path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  {path: 'edit/:id', component: EditperfilComponent, canActivate: [AuthGuard]},
  {path: 'detalles/:id', component: DetallesComponent, canActivate: [AuthGuard]},
  {path: 'add', component: AddGamesComponent, canActivate: [AuthGuard]},
  {path: 'editGame/:id', component: AddGamesComponent, canActivate: [AuthGuard]},
  {path: 'games', component: MispartidasComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
