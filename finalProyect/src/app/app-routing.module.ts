import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContentmainComponent } from './contentmain/contentmain.component';
import { DetallesComponent } from './detalles/detalles.component';
import { AuthGuard } from './shared/guard/auth.guard';
import { EditperfilComponent } from './editperfil/editperfil.component';
import { AddGamesComponent } from './add-games/add-games.component';
import { MispartidasComponent } from './mispartidas/mispartidas.component';

const routes: Routes = [
  {path: 'home', component: ContentmainComponent},
  {path: 'home/:id', component: ContentmainComponent, canActivate: [AuthGuard]},
  {path: 'perfil/:id', component: EditperfilComponent},
  {path: 'detalles/:id', component: DetallesComponent},
  {path: 'add', component: AddGamesComponent, canActivate: [AuthGuard]},
  {path: 'editGame/:id', component: AddGamesComponent, canActivate: [AuthGuard]},
  {path: 'games', component: MispartidasComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
