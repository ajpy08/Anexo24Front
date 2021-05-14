import { UsuarioService } from './../users/usuario.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Usuario } from 'app/pages/users/usuario';
import { MatTableDataSource } from '@angular/material/table';
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
    // 'foto',
    'nombre',
    'email',
    'estado',
    // 'role',
    // 'empresas',
    'createdAt'
  ];
  dataSource: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.cargando = true;
    this.usuarioService.getUsuarios().subscribe((users: any) => {
      this.dataSource = new MatTableDataSource(users.users);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.totalRegistros = users.users.length;
    });
    this.cargando = false;
  }

  exportarXLSX() {
  }
}
