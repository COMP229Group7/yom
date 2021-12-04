import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';


import { HomeComponent } from './pages/home/home.component';
import { ListSurveyComponent } from './pages/list-survey/list-survey.component';
import { Survey1Component } from './pages/surveys/survey1/survey1.component';
import { Survey2Component } from './pages/surveys/survey2/survey2.component';
import { Survey3Component } from './pages/surveys/survey3/survey3.component';
import { TemplatesComponent } from './pages/templates/templates.component';

const routes: Routes = [
  {path:'',redirectTo:'/home',pathMatch:'full'},
  {path:'home',component:HomeComponent, data:{title:'Home'}},
  {path:'create',component:TemplatesComponent, data:{title:'Create'}},
  {path:'respond',component:ListSurveyComponent, data:{title:'Respond'}},
  {path:'login',component:LoginComponent, data:{title:'Login'}},
  {path:'survey1',component:Survey1Component, data:{title:'Survey1'}},
  {path:'survey2',component:Survey2Component, data:{title:'Survey2'}},
  {path:'survey3',component:Survey3Component, data:{title:'Survey3'}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
