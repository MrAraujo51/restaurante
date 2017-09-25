import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// Routes
import { _ROUTING } from './app.routes';

// Services
import { AuthService } from './service/auth.service';
import { ValidateService } from './service/validate.service';
import { OrderService } from './service/order.service';

// Guards
import { AuthGuard } from './guards/auth.guard';
import { NotAuthGuard } from './guards/not-auth.guard';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    RegisterComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    _ROUTING
  ],
  providers: [
    Title,
    ValidateService,
    AuthService,
    AuthGuard,
    NotAuthGuard,
    OrderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
