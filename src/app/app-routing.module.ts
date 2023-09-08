import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { AboutComponent } from './about/about.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home' , pathMatch: 'full'},
  { path: 'home', canActivate:[AuthGuard] ,component: HomeComponent},

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent},
  
  { path: 'about', canActivate:[AuthGuard] , component: AboutComponent},
  { path: '**', canActivate:[AuthGuard] , component: NotfoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
