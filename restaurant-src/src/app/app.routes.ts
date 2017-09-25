/*
 * @author: Manuel Araujo <alejandromanuel5187@gmail.com>
 * Created on 2017-09-23 16:30:16
 */
import { Routes, RouterModule } from '@angular/router';

// Guards
import { AuthGuard } from './guards/auth.guard';
import { NotAuthGuard } from './guards/not-auth.guard';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [NotAuthGuard],
        data: {
            title: 'Restaurant | Login'
        }
    },
    {
        path: 'register',
        component: RegisterComponent,
        canActivate: [NotAuthGuard],
        data: {
            title: 'Restaurant | Register'
        }
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard],
        data: {
            title: 'Restaurant | Dashboard'
        }
    },
    {   path: '**', redirectTo: 'login'}
];

export const _ROUTING = RouterModule.forRoot(routes);
