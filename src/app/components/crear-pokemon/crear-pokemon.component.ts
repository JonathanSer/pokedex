import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-pokemon',
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule
  ],
  templateUrl: './crear-pokemon.component.html',
  styleUrl: './crear-pokemon.component.css',
})
export class CrearPokemonComponent {
  pokemonForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.pokemonForm = this.fb.group({
      name: ['', [Validators.required]],
      height: [0, [Validators.required, Validators.min(1)]],
      weight: [0, [Validators.required, Validators.min(1)]],
      base_experience: [0, [Validators.required]],
      is_default: [false],
      abilities: this.fb.array([]),
      types: this.fb.array([]),
    });
  }

  get abilities(): FormArray {
    return this.pokemonForm.get('abilities') as FormArray;
  }

  get types(): FormArray {
    return this.pokemonForm.get('types') as FormArray;
  }

  addAbility() {
    this.abilities.push(this.fb.group({
      ability: this.fb.group({
        name: ['', Validators.required],
        url: ['']
      }),
      is_hidden: [false],
      slot: [1]
    }));
  }

  addType() {
    this.types.push(this.fb.group({
      slot: [1],
      type: this.fb.group({
        name: ['', Validators.required],
        url: ['']
      })
    }));
  }

  eliminarAbility(index: number) {
    this.abilities.removeAt(index);
  }

  eliminarType(index: number) {
    this.types.removeAt(index);
  }

  guardarPokemon() {
    if (this.pokemonForm.valid) {
      console.log('Nuevo Pokémon creado:', this.pokemonForm.value);
      this.router.navigate(['/pokemons']); // ruta de la lista
    } else {
      this.pokemonForm.markAllAsTouched();
    }
  }

  cancelar() {
    this.router.navigate(['/pokemons']);
  }
}
