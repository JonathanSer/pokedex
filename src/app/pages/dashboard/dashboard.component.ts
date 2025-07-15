 import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Usuario } from '../../interfaces/usuario.interface';
import { TableComponent } from "../../components/table/table.component";
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { SearchComponent } from "../../components/search/search.component";
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [TableComponent, NavbarComponent, SearchComponent, RouterOutlet],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {

  authService = inject(AuthService);
  router = inject(Router);

  usuario = signal<Usuario | null>(null);

  buscarTerm = signal<string>('');

  get estaEnDetalle(): boolean {
    return this.router.url.includes('/by/');
  }

  get estaEnEditar(): boolean {
    return this.router.url.includes('/editar/');
  }

  ngOnInit(): void {
    this.usuario.set(this.authService.getUser());
    if(!this.usuario()) this.router.navigate(['/login']);
  }

  buscar(value: string) {
    this.buscarTerm.set(value);
  }
}
