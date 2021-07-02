import { AgentesAduanalesComponent } from './../../pages/agentes-aduanales/agentes-aduanales.component';
import { EmpresaComponent } from './../../pages/empresas/empresa.component';
import { EmpresasComponent } from './../../pages/empresas/empresas.component';
import { UsersComponent } from './../../pages/users/users.component';
import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserComponent } from '../../pages/users/user.component';
import { TableComponent } from '../../pages/table/table.component';
import { TypographyComponent } from '../../pages/typography/typography.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { NotificationsComponent } from '../../pages/notifications/notifications.component';
import { UpgradeComponent } from '../../pages/upgrade/upgrade.component';
import { AgenteAduanalComponent } from 'app/pages/agentes-aduanales/agente-aduanal.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'table',          component: TableComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent },
    { path: 'users',          component: UsersComponent },
    // { path: 'user',           component: UserComponent },
    {
        path: 'users/:id',
        component: UserComponent,
        // canActivate: [REIMGuard],
        data: { titulo: 'Actualizacion de Usuario' }
        // data: { titulo: 'Actualizacion de Usuarios.', roles: [ROLES.ADMIN_ROLE] }
    },
    { path: 'empresas', component: EmpresasComponent },
    {
        path: 'empresas/:id',
        component: EmpresaComponent,
        // canActivate: [REIMGuard],
        data: { titulo: 'Actualizacion de Empresa' }
        // data: { titulo: 'Actualizacion de Empresa', roles: [ROLES.ADMIN_ROLE] }
    },
    { path: 'agentesAduanales', component: AgentesAduanalesComponent },
    {
        path: 'agentesAduanales/:id',
        component: AgenteAduanalComponent,
        // canActivate: [REIMGuard],
        data: { titulo: 'Actualizacion de Agentes Aduanales' }
        // data: { titulo: 'Actualizacion de Empresa', roles: [ROLES.ADMIN_ROLE] }
    },
];
