import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { ChatWindowComponent } from './chat-window/chat-window.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { AuthGuard } from './auth.guard';
import { RoleGuard } from './role.guard';
import { Role } from './roles';
import { DeleteUsersComponent } from './delete-users/delete-users.component';
import { ManageGroupsComponent } from './manage-groups/manage-groups.component';


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
  {
    path: 'createUser',
    component: UserManagementComponent,  
    canActivate: [RoleGuard],
    data: { expectedRole: Role.superUser }
  },
  {
    path: 'deleteUsers',
    component: DeleteUsersComponent,
    canActivate: [RoleGuard],
    data: { expectedRole: Role.superUser }  // Only super users can access this page
  },
  {
  path: 'manageGroups',
  component: ManageGroupsComponent,  
  canActivate: [RoleGuard],
  data: { expectedRole: Role.admin }
  },

  {path: 'login', component: LoginComponent},
  //{path: 'chat', component: ChatWindowComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
