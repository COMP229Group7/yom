import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';


import { HomeComponent } from './pages/home/home.component';
import { ListSurveyComponent } from './pages/list-survey/list-survey.component';
import { TemplatesComponent } from './pages/templates/templates.component';

const routes: Routes = [
  {path:'',redirectTo:'/home',pathMatch:'full'},
  {path:'home',component:HomeComponent, data:{title:'Home'}},
  {path:'create',component:TemplatesComponent, data:{title:'Create'}},
  {path:'respond',component:ListSurveyComponent, data:{title:'Respond'}},
  {path:'login',component:LoginComponent, data:{title:'Login'}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
