import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { ChatWindowComponent } from './chat-window/chat-window.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: 'dashboard', 
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path:'chat/:id',
        component: ChatWindowComponent,
        canActivate: [AuthGuard],
      },
    ]
  
  },
  {path: 'login', component: LoginComponent},
  //{path: 'chat', component: ChatWindowComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
