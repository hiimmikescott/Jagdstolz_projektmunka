import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BookFormComponent } from './parts/book-form/book-form.component';
import { BookMainComponent } from './parts/book-main/book-main.component';
import { FooterComponent } from './parts/footer/footer.component';
import { GalleryComponent } from './parts/gallery/gallery.component';
import { HomeComponent } from './parts/home/home.component';
import { InfoComponent } from './parts/info/info.component';
import { NavComponent } from './parts/nav/nav.component';
import { ProfileComponent } from './parts/profile/profile.component';
import { SignupComponent } from './parts/signup/signup.component';
import { MapComponent } from './parts/map/map.component';
import { LoginComponent } from './parts/login/login.component';
import { MatSnackBarModule} from '@angular/material/snack-bar';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AdminComponent } from './parts/admin/admin.component';
import { UsersComponent } from './parts/admin/users/users.component';
import { ReservationsComponent } from './parts/admin/reservations/reservations.component';
import { SpotsComponent } from './parts/admin/spots/spots.component';


@NgModule({
  declarations: [
    AppComponent,
    BookFormComponent,
    BookMainComponent,
    FooterComponent,
    GalleryComponent,
    HomeComponent,
    InfoComponent,
    NavComponent,
    ProfileComponent,
    SignupComponent,
    MapComponent,
    LoginComponent,
    AdminComponent,
    UsersComponent,
    ReservationsComponent,
    SpotsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
