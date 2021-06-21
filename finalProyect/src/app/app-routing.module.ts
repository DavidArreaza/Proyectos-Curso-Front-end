import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MenulateralComponent } from './menulateral/menulateral.component';
import { ContentmainComponent } from './contentmain/contentmain.component';

const routes: Routes = [
  {path: 'sidebar', component: MenulateralComponent},
  {path: '', component: ContentmainComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
