import { APP_BASE_HREF } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './lib/auth.guard';
import { LogoutGuard } from './lib/logout.guard';
import { LoginComponent } from './login/login/login.component';

const routes: Routes = [
  // , canActivate:[AuthGuard]
  { path:'login',component: LoginComponent, canActivate: [LogoutGuard]}, 
  { path: '', loadChildren: () => import('./main/main.module').then(m => m.MainModule),canActivate: [AuthGuard],},  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [{provide: APP_BASE_HREF, useValue : '/' }]
})
export class AppRoutingModule { }