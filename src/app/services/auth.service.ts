import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usuarioActual: Usuario | null = null;

  setUser(user: Usuario) {
    this.usuarioActual = user;
  }

  getUser(): Usuario | null {
    return this.usuarioActual;
  }

  logout() {
    this.usuarioActual = null;
  }
}
