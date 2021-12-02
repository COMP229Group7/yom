import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './partials/header/header.component';
import { FooterComponent } from './partials/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { TemplatesComponent } from './pages/templates/templates.component';
import { ListSurveyComponent } from './pages/list-survey/list-survey.component';
import { Survey1Component } from './pages/surveys/survey1/survey1.component';
import { Survey2Component } from './pages/surveys/survey2/survey2.component';
import { Survey3Component } from './pages/surveys/survey3/survey3.component';
import { BasepageComponent } from './partials/basepage/basepage.component';
import { LoginNavComponent } from './partials/login-nav/login-nav.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    TemplatesComponent,
    ListSurveyComponent,
    Survey1Component,
    Survey2Component,
    Survey3Component,
    BasepageComponent,
    LoginNavComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
