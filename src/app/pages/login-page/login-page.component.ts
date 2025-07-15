import { Component, inject, signal } from '@angular/core';
import { Usuario } from '../../interfaces/usuario.interface';
import { Router } from '@angular/router';
import { ApiUsuariosService } from '../../services/apiUsuarios.service';
import Swal from 'sweetalert2';
import { InputComponent } from "../../components/input/input.component";
import { ButtonComponent } from "../../components/button/button.component";
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-page',
  imports: [FormsModule, InputComponent, ButtonComponent],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent {
  api = inject(ApiUsuariosService);
  router = inject(Router);
  authService = inject(AuthService);

  usuarios: Usuario[] = [];

  esRegistro = signal(false);
  confirmarContrasena = '';

  ngOnInit(): void {
    this.api.getUsuarios().subscribe((respuesta) => {
      this.usuarios = respuesta;
    });
  }

  cambiar(event: Event) {
    event.preventDefault();
    this.esRegistro.set(!this.esRegistro());
  }

  enviar(correo: string, contrasena: string) {
    if (this.esRegistro()) {
      this.registrar(correo, contrasena);
    } else {
      this.acceder(correo, contrasena);
    }
  }

  acceder(correo: string, contrasena: string) {
    if (!correo || !contrasena) {
      Swal.fire('Campos requeridos', 'Todos los campos son obligatorios.', 'warning');
      return;
    }

    const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!correoRegex.test(correo)) {
      Swal.fire('Correo inválido', 'Formato de correo inválido.', 'error');
      return;
    }

    if (contrasena.length < 6) {
      Swal.fire('Contraseña débil', 'La contraseña debe tener al menos 6 caracteres.', 'error');
      return;
    }

    const usuarioEncontrado = this.usuarios.find(
      u => u.email === correo && u.password === contrasena
    );

    if (!usuarioEncontrado) {
      Swal.fire('Acceso denegado', 'Usuario o contraseña incorrectos.', 'error');
      return;
    }

    this.authService.setUser(usuarioEncontrado);
    this.router.navigate(['/dashboard']);
  }

  registrar(correo: string, contrasena: string) {
    if (!correo || !contrasena) {
      Swal.fire('Campos requeridos', 'Correo y contraseña son obligatorios.', 'warning');
      return;
    }

    const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!correoRegex.test(correo)) {
      Swal.fire('Correo inválido', 'Por favor ingresa un correo válido.', 'error');
      return;
    }

    const mayuscula = /[A-Z]/;
    const numero = /[0-9]/;
    const caracterEspecial = /[!@#$%^&*(),.?":{}|<>]/;

    if (contrasena.length < 6) {
      Swal.fire('Contraseña débil', 'Debe tener al menos 6 caracteres.', 'error');
      return;
    }

    if (!mayuscula.test(contrasena)) {
      Swal.fire('Contraseña inválida', 'Debe contener al menos una letra mayúscula.', 'error');
      return;
    }

    if (!numero.test(contrasena)) {
      Swal.fire('Contraseña inválida', 'Debe contener al menos un número.', 'error');
      return;
    }

    if (!caracterEspecial.test(contrasena)) {
      Swal.fire('Contraseña inválida', 'Debe tener al menos un carácter especial.', 'error');
      return;
    }

    const existe = this.usuarios.some(u => u.email === correo);
    if (existe) {
      Swal.fire('Correo existente', 'Este correo ya está registrado.', 'warning');
      return;
    }

    // Registrar usuario
    this.usuarios.push({
      id: '0',
      name: '',
      image: '',
      email: correo,
      password: contrasena
    });

    Swal.fire('¡Registro exitoso!', 'Usuario registrado con éxito. Ahora puedes iniciar sesión.', 'success');

    this.esRegistro.set(false);
  }
}
