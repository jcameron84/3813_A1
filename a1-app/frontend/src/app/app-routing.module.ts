import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { ChatWindowComponent } from './chat-window/chat-window.component';

const routes: Routes = [
  {
    path: 'dashboard', 
    component: DashboardComponent,
    children: [
      {
        path:'chat/:id',
        component: ChatWindowComponent
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
