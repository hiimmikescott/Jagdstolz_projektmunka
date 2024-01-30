import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'


import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './parts/home/home.component';
import { InfoComponent } from './parts/info/info.component';
import { ProfileComponent } from './parts/profile/profile.component';
import { NavComponent } from './parts/nav/nav.component';
import { FormsModule} from '@angular/forms';
import { SignupComponent } from './parts/signup/signup.component';
import { BookMainComponent } from './parts/book-main/book-main.component';
import { BookFormComponent } from './parts/book-form/book-form.component';
import { GaleryComponent } from './parts/galery/galery.component';
import { FooterComponent } from './parts/footer/footer.component';
import { SpotModalComponent } from './parts/spot-modal/spot-modal.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    InfoComponent,
    ProfileComponent,
    NavComponent,
    SignupComponent,
    BookMainComponent,
    BookFormComponent,
    GaleryComponent,
    FooterComponent,
    SpotModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
