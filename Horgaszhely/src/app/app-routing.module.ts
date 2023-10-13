import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './parts/home/home.component';
import { InfoComponent } from './parts/info/info.component';
import { ProfileComponent } from './parts/profile/profile.component';

const routes: Routes = [
  {path: "home",component:HomeComponent},
  {path: "info",component:InfoComponent},
  {path: "profile",component:ProfileComponent},
  {path: " ",component:HomeComponent},
  {path: "**",component:HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
