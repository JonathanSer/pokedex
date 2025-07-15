import { Component, inject, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { Usuario } from '../../interfaces/usuario.interface';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-navbar',
  imports: [
    FormsModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {

  private route = inject(Router);
  private pokemonService = inject(PokemonService);

  /*user = {
    name: 'Mae Bailey',
    email: 'Otho.Oberbrunner@example.net',
    image: 'https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/female/512/93.jpg',
    id: '5',
  };*/

  user = input.required<Usuario | null>();

  salir() {
    this.pokemonService.restablecer();
    this.route.navigate(['/']);
  }
}
