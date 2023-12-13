import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './parts/home/home.component';
import { InfoComponent } from './parts/info/info.component';
import { ProfileComponent } from './parts/profile/profile.component';
import { SignupComponent } from './parts/signup/signup.component';

const routes: Routes = [
  {path: "home",component:HomeComponent},
  {path: "info",component:InfoComponent},
  {path: "profile",component:ProfileComponent},
  {path: "signup",component:SignupComponent},
  {path: " ",component:HomeComponent},
  {path: "**",component:HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
