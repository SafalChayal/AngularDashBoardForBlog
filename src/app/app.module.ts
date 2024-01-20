import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {AngularFireModule} from '@angular/fire/compat';
import { environment } from 'src/environments/environment.development';
import {FirestoreModule} from '@angular/fire/firestore';
import { CategoriesComponent } from './categories/categories.component'
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    CategoriesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    FirestoreModule,
    FormsModule,
    AngularFireModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
