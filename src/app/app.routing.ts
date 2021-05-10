// import { Routes } from '@angular/router';

// import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';

// export const AppRoutes: Routes = [
//   {
//     path: '',
//     redirectTo: 'dashboard',
//     pathMatch: 'full',
//   }, {
//     path: '',
//     component: AdminLayoutComponent,
//     children: [
//         {
//       path: '',
//       loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
//   }]},
//   {
//     path: '**',
//     redirectTo: 'dashboard'
//   }
// ]

import { Routes } from '@angular/router';
import { LoginGuard } from './guards/login.guard';
import { VerificaTokenGuard } from './guards/verificatoken.guard';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './pages/login/login.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';

export const AppRoutes: Routes = [
  {path: 'login', component: LoginComponent},
  {
      path: '',
      canActivate: [ LoginGuard ],
      canActivateChild: [ VerificaTokenGuard ],
      component: AdminLayoutComponent,
      loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
  },
  { path: '**', component: NotfoundComponent }
]
