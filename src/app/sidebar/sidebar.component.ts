import { nombreSistema } from './../config/config';
import { Component, OnInit } from '@angular/core';
export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    isDropDownMenu: boolean,
    dropDownTarget: string,
    submenu: Array<SubMenu>
}

export interface SubMenu {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    {
        path: '/dashboard', title: 'Dashboard', icon: 'nc-bank', class: '', isDropDownMenu: false,
        dropDownTarget: '', submenu: undefined
    },
    {
        path: '', title: 'Catálogos', icon: 'nc-tile-56', class: '', isDropDownMenu: true,
        dropDownTarget: 'catalogosTarget',
        submenu: [
            { path: '/users', title: 'Usuarios', icon: 'far fa-user', class: '' },
            { path: '/empresas', title: 'Empresas', icon: 'far fa-building', class: '' },
            { path: '/agentesAduanales', title: 'Agentes', icon: 'fas fa-user-tie', class: '' }
        ]
    },
    {
        path: '/icons', title: 'Icons', icon: 'nc-diamond', class: '', isDropDownMenu: false,
        dropDownTarget: '', submenu: undefined
    },
    {
        path: '/maps', title: 'Maps', icon: 'nc-pin-3', class: '', isDropDownMenu: false,
        dropDownTarget: '', submenu: undefined
    },
    {
        path: '/notifications', title: 'Notifications', icon: 'nc-bell-55', class: '', isDropDownMenu: false,
        dropDownTarget: '', submenu: undefined
    },
    {
        path: '/user', title: 'User Profile', icon: 'nc-single-02', class: '', isDropDownMenu: false,
        dropDownTarget: '', submenu: undefined
    },
    {
        path: '/table', title: 'Table List', icon: 'nc-tile-56', class: '', isDropDownMenu: false,
        dropDownTarget: '', submenu: undefined
    },
    {
        path: '/typography', title: 'Typography', icon: 'nc-caps-small', class: '', isDropDownMenu: false,
        dropDownTarget: '', submenu: undefined
    }
    // { path: '/upgrade',       title: 'Upgrade to PRO',    icon: 'nc-spaceship',  class: 'active-pro' },
];

@Component({
    moduleId: module.id,
    selector: 'app-sidebar-cmp',
    templateUrl: 'sidebar.component.html',
    styleUrls: ['./sidebar.component.css'],
})

export class SidebarComponent implements OnInit {
    nombreSistema = nombreSistema;
    public menuItems: any[];
    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
}
