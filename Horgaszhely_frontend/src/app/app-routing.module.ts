import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './parts/home/home.component';
import { InfoComponent } from './parts/info/info.component';
import { ProfileComponent } from './parts/profile/profile.component';
import { SignupComponent } from './parts/signup/signup.component';
import { BookMainComponent } from './parts/book-main/book-main.component';
import { BookFormComponent } from './parts/book-form/book-form.component';
import { GalleryComponent } from './parts/gallery/gallery.component';
import { LoginComponent } from './parts/login/login.component';
import { AdminComponent } from './parts/admin/admin.component';
import { UsersComponent } from './parts/admin/users/users.component';
import { ReservationsComponent } from './parts/admin/reservations/reservations.component';
import { SpotsComponent } from './parts/admin/spots/spots.component';

const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "info", component: InfoComponent },
  { path: "profile", component: ProfileComponent},
  { path: "signup", component: SignupComponent},
  { path: "bookmain", component: BookMainComponent },
  { path: "bookform", component: BookFormComponent },
  { path: "galery", component: GalleryComponent },
  { path: "login", component: LoginComponent },
  { path: "admin", component: AdminComponent },
  { path: "users", component: UsersComponent },
  { path: "reservations", component: ReservationsComponent },
  { path: "spots", component: SpotsComponent },

  { path: " ", component: HomeComponent },
  { path: "**", component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } 
