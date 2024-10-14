import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChatWindowComponent } from './chat-window/chat-window.component';
import { AuthGuard } from './guards/auth.guard';
import { UserManagementComponent } from './user-management/user-management.component';
import { HttpClientModule } from '@angular/common/http';
import { DeleteUsersComponent } from './delete-users/delete-users.component';
import { ManageGroupsComponent } from './manage-groups/manage-groups.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    ChatWindowComponent,
    UserManagementComponent,
    DeleteUsersComponent,
    ManageGroupsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
