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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import {BrowserAnimationsModule} from  '@angular/platform-browser/animations';
import { AllPostComponent } from './posts/all-post/all-post.component';
import { NewPostComponent } from './posts/new-post/new-post.component';
import {AngularEditorModule} from '@kolkov/angular-editor';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { LoginComponent } from './auth/login/login.component';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { SubscribersComponent } from './subscribers/subscribers.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    CategoriesComponent,
    AllPostComponent,
    NewPostComponent,
    LoginComponent,
    SubscribersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    FirestoreModule,
    FormsModule,
    AngularFireModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    AngularEditorModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularFireStorageModule,
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
