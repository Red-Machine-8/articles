import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginPageComponent} from './login-page/login-page.component';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { SiteLayoutComponent } from './shared/layouts/site-layout/site-layout.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { ContactPageComponent } from './contact-page/contact-page.component';
import {AuthService} from "./shared/services/auth.service";
import {AuthGuard} from "./shared/classes/auth.guard";
import {LoaderComponent} from "./shared/loader/loader.component";
import {ContactFormPageComponent} from "./contact-page/contact-form-page/contact-form-page.component";
import {ContactService} from "./shared/services/contact.service";
import {CommonModule} from "@angular/common";
import { ArticlePageComponent } from './article-page/article-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    AuthLayoutComponent,
    SiteLayoutComponent,
    ContactPageComponent,
    LoaderComponent,
    ContactFormPageComponent,
    LoaderComponent,
    RegisterPageComponent,
    ArticlePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    ContactService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
