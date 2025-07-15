import { Component, inject } from '@angular/core';
import { Pokemon } from '../../interfaces/pokemon.interfaces';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiPokemonService } from '../../services/apiPokemon.service';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { TitleCasePipe } from '@angular/common';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-editar-pokemon',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatCardModule,
    TitleCasePipe
  ],
  templateUrl: './editar-pokemon.component.html',
  styleUrl: './editar-pokemon.component.css',
})
export class EditarPokemonComponent {
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private pokemonService = inject(PokemonService);

  pokemon: Pokemon | null = null;
  form!: FormGroup;
  loading = false;

  ngOnInit(): void {
    this.pokemon = this.pokemonService.getPokemon();
    console.log(this.pokemon);

    if (this.pokemon) {
      this.initForm();
    }
    /*const id = this.route.snapshot.paramMap.get('code');
    if (id) {
      this.api.obtenerPokemonPorId(+id).subscribe((poke) => {
        this.pokemon = poke;
        this.initForm();
      });
    }*/
  }

  initForm() {
    this.form = this.fb.group({
      name: [this.pokemon?.name ?? '', [Validators.required, Validators.minLength(3)]],
      height: [this.pokemon?.height ?? 0, [Validators.required, Validators.min(1)]],
      weight: [this.pokemon?.weight ?? 0, [Validators.required, Validators.min(1)]],
      base_experience: [this.pokemon?.base_experience ?? 0, [Validators.required, Validators.min(0)]],
      types: this.fb.array(this.pokemon?.types.map(t => this.fb.control(t.type.name)) ?? []),
      abilities: this.fb.array(this.pokemon?.abilities.map(a => this.fb.group({
        name: [a.ability?.name ?? '', Validators.required],
        is_hidden: [a.is_hidden]
      })) ?? [])
    });
  }

  get types(): FormArray {
    return this.form.get('types') as FormArray;
  }

  get abilities(): FormArray {
    return this.form.get('abilities') as FormArray;
  }

  agregarTipo() {
    this.types.push(this.fb.control(''));
  }

  eliminarTipo(index: number) {
    this.types.removeAt(index);
  }

  agregarHabilidad() {
    this.abilities.push(this.fb.group({
      name: ['', Validators.required],
      is_hidden: [false]
    }));
  }

  eliminarHabilidad(index: number) {
    this.abilities.removeAt(index);
  }

  guardar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;

    const formData = this.form.value;
    const pokemonOriginal = this.pokemonService.getPokemon();

    if (!pokemonOriginal) return;

    const tiposFormateados = formData.types.map((tipo: string, index: number) => ({
      slot: index + 1,
      type: {
        name: tipo,
        url: `https://pokeapi.co/api/v2/type/${tipo}`
      }
    }));

    const habilidadesFormateadas = formData.abilities.map((a: any) => ({
      is_hidden: a.is_hidden,
      ability: {
        name: a.name,
        url: `https://pokeapi.co/api/v2/ability/${a.name}`
      }
    }));

    const pokemonActualizado: Pokemon = {
      ...pokemonOriginal,
      name: formData.name,
      height: formData.height,
      weight: formData.weight,
      base_experience: formData.base_experience,
      types: tiposFormateados,
      abilities: habilidadesFormateadas
    };

    this.pokemonService.actualizarPokemon(pokemonActualizado);

    setTimeout(() => {
      this.loading = false;
      alert('¡Pokémon actualizado correctamente!');
      this.volver();
    }, 1000);
  }




  volver() {
    this.router.navigate(['/dashboard']);
  }
}
