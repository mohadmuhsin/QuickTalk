import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SocketIoModule,SocketIoConfig } from 'ngx-socket-io';
import { AppRoutingModule } from './app-routing.module';
import{HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ChatComponent } from './components/chat/chat.component';
import { PollComponent } from './components/poll/poll.component'
import { environment } from 'src/environment/environment';
import { ReqInterceptorInterceptor } from './interceptor/req-interceptor.interceptor';
import { userGuard } from './guards/user-guard.guard';

const config: SocketIoConfig = {
	url: environment.base_url, 
	options: {
	}
}


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    NavbarComponent,
    ChatComponent,
    PollComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SocketIoModule.forRoot(config), 
    
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ReqInterceptorInterceptor,
      multi: true,
    },
    userGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
