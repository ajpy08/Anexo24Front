import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { VerificaTokenGuard } from './guards/verificatoken.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';

import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule } from './shared/navbar/navbar.module';
import { FixedPluginModule } from './shared/fixedplugin/fixedplugin.module';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './pages/login/login.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsuarioService } from './pages/users/usuario.service';
import { HttpClientModule } from '@angular/common/http';
import { LoginGuard } from './guards/login.guard';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UsersComponent } from './pages/users/users.component';
import { UserComponent } from './pages/users/user.component';
import { EmpresasComponent } from './pages/empresas/empresas.component';
import { EmpresaComponent } from './pages/empresas/empresa.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { DireccionesComponent } from './pages/direcciones/direcciones.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminLayoutComponent,
    NotfoundComponent,
    UsersComponent,
    UserComponent,
    EmpresasComponent,
    EmpresaComponent,
    DireccionesComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes, {
      useHash: true
    }),
    SidebarModule,
    NavbarModule,
    ToastrModule.forRoot(
      {
        timeOut: 4000,
        preventDuplicates: true
      }
    ),
    FooterModule,
    FixedPluginModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatSelectModule,
    MatSortModule,
    MatPaginatorModule,
    MatTableModule,
  ],
  providers: [
    UsuarioService,
    LoginGuard,
    VerificaTokenGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
