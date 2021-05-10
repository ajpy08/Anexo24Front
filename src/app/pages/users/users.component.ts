import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Usuario } from 'app/models/usuario';
import { ICategoryStructure } from './user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  usuarios: Usuario[] = [];
  totalRegistros = 0;
  cargando = true;
  // roles = ROLES_ARRAY;
  usuarioExcel = [];
  displayedColumns = [
    'actions',
    'foto',
    'email',
    'activo',
    'nombre',
    'role',
    'empresas'
  ];
  dataSource: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public categories: ICategoryStructure[] = [
    {
      id: 1,
      isDropDownMenu: false,
      description: 'description1',
      dropDownTarget: '',
      subMenuList: []
    },
    {
      id: 2,
      isDropDownMenu: false,
      description: 'description2',
      dropDownTarget: '',
      subMenuList: []
    },
    {
      id: 3,
      isDropDownMenu: true,
      description: 'description3',
      dropDownTarget: 'description3Target',
      subMenuList: ['subDescription1', 'subDescription2', 'subDescription3']
    }
  ];

  constructor() { }

  ngOnInit(): void {
    this.cargando = false;
  }

}
