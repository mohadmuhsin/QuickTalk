import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ChatComponent } from './components/chat/chat.component';
import { PollComponent } from './components/poll/poll.component';
import { userGuard } from './guards/user-guard.guard';

const routes: Routes = [
  { path: "", canActivate:[userGuard], component: HomeComponent },
  { path: "register", canActivate:[userGuard],component: RegisterComponent },
  { path: "login",canActivate:[userGuard], component: LoginComponent },
  { path: "chat",canActivate:[userGuard], component: ChatComponent },
  {path:"poll", canActivate:[userGuard],component:PollComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
