import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateBioComponent } from './create-bio/create-bio.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { HomeComponent } from './home/home.component';
import { InfoComponent } from './info/info.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './shared/guard/auth.guard';

const routes: Routes = [
  { path: "", component: HomeComponent, pathMatch: "full" },
  { path: "profile", component: ProfileComponent, canActivate: [AuthGuard] },
  { path: "create-bio", component: CreateBioComponent, canActivate: [AuthGuard] },
  { path: "edit/:id", component: CreateBioComponent, canActivate: [AuthGuard] },
  { path: "bio/:userid/:id", component: InfoComponent, canActivate: [AuthGuard] },
  { path: "editprofile", component: EditProfileComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
