import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { AuthCallback } from './auth/auth-callback/auth-callback';
import { AuthGuard } from './auth/guard/auth-guard';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'auth/callback', component: AuthCallback },
  { path: 'dashboard', loadComponent: () => import('./dashboard/panel-cliente/panel-cliente').then(m => m.PanelCliente), canActivate: [AuthGuard] },
  // ...
];
