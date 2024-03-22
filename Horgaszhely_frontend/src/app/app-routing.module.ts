import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './parts/home/home.component';
import { AboutUsComponent } from './parts/about-us/about-us.component';
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
import { RoleGuard } from './services/auth.guard';
import { ReservationComponent } from './parts/reservation/reservation.component';

const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "info", component: AboutUsComponent },
  { path: "profile", component: ProfileComponent , canActivate: [RoleGuard], data: { roles: ['admin',"user"] }},
  { path: "register", component: SignupComponent, canActivate: [RoleGuard], data: { roles: ['admin',"user"] }},
  { path: "bookmain", component: BookMainComponent },
  { path: "bookform", component: BookFormComponent , canActivate: [RoleGuard], data: { roles: ['admin',"user"] }},
  { path: "gallery", component: GalleryComponent, canActivate: [RoleGuard], data: { roles: ['admin',"user"] }},
  { path: "login", component: LoginComponent , canActivate: [RoleGuard], data: { roles: ['admin',"user"] }},
  { path: "reservation", component: ReservationComponent },
  { path: "admin", component: AdminComponent, canActivate: [RoleGuard], data: { roles: ['admin'] } },
  { path: "users", component: UsersComponent, canActivate: [RoleGuard], data: { roles: ['admin'] }},
  { path: "reservations", component: ReservationsComponent, canActivate: [RoleGuard], data: { roles: ['admin'] }},
  { path: "spots", component: SpotsComponent, canActivate: [RoleGuard], data: { roles: ['admin'] }},

  { path: " ", component: HomeComponent },
  { path: "**", component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
