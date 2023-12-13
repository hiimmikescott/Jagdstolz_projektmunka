import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './parts/home/home.component';
import { InfoComponent } from './parts/info/info.component';
import { ProfileComponent } from './parts/profile/profile.component';
import { SignupComponent } from './parts/signup/signup.component';
import { GaleryComponent } from './parts/galery/galery.component';
import { BookFormComponent } from './parts/book-form/book-form.component';
import { BookMainComponent } from './parts/book-main/book-main.component';

const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "info", component: InfoComponent },
  { path: "profile", component: ProfileComponent },
  { path: "signup", component: SignupComponent },
  { path: "bookmain", component: BookMainComponent },
  { path: "bookform", component: BookFormComponent },
  { path: "galery", component: GaleryComponent },

  { path: " ", component: HomeComponent },
  { path: "**", component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
