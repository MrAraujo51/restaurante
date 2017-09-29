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
import { OrdersPendingComponent } from './components/orders-pending/orders-pending.component';
import { OrdersInProcessComponent } from './components/orders-in-process/orders-in-process.component';
import { OrdersDoneComponent } from './components/orders-done/orders-done.component';
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
        path: 'orders/pending',
        component: OrdersPendingComponent,
        data: {
            title: 'Restaurant | Ordenes Pendientes'
        }
    },
    {
        path: 'orders/in-process',
        component: OrdersInProcessComponent,
        data: {
            title: 'Restaurant | Ordenes en Proceso'
        }
    },
    {
        path: 'orders/done',
        component: OrdersDoneComponent,
        data: {
            title: 'Restaurant | Ordenes Pendientes'
        }
    },
    {   path: '**', redirectTo: 'login'}
];

export const _ROUTING = RouterModule.forRoot(routes);
