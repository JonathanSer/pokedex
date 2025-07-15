import { inject, Injectable, signal } from '@angular/core';
import { Pokemon } from '../interfaces/pokemon.interfaces';
import { ApiPokemonService } from './apiPokemon.service';

export interface IconoPokemon {
  [pokemonId: number]: string[]
}

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private apiPokemon = inject(ApiPokemonService);

  private pokemonSeleccionado: Pokemon | null = null;
  private pokemons= signal<Pokemon[]>([]);
  private tipoIconosMap: IconoPokemon  = {};

  private yaCargado = false;
  private cargando = false;

  limit = 8;
  totalPokemons = 1302;

  setPokemon(pokemon: Pokemon) {
    this.pokemonSeleccionado = pokemon;
  }

  getPokemon(): Pokemon | null {
    return this.pokemonSeleccionado;
  }

  getPokemons(): Pokemon[] | null{
    return this.pokemons();
  }

  gettipoIconosMap(): IconoPokemon | null {
    return this.tipoIconosMap;
  }

  restablecer(){
    this.yaCargado = false
    this.cargando = false
  }

  loadAllPokemons(): void {
    if (this.yaCargado || this.cargando) return;

    this.cargando = true;
    const limit = this.limit;
    const total = this.totalPokemons;

    const fetchPage = (offset: number) => {
      this.apiPokemon.getPokemons(offset, limit).subscribe(pokemons => {
        // Agrega los nuevos Pokémon a la señal existente
        this.pokemons.update(actual => [...actual, ...pokemons]);

        // Carga íconos individualmente y los va insertando
        pokemons.forEach(pokemon => {
          this.apiPokemon.getTipoIconoUrls(pokemon).subscribe(icons => {
            this.tipoIconosMap[pokemon.id] = icons;
          });
        });

        // Continuar si quedan más
        if (offset + limit < total) {
          fetchPage(offset + limit);
        } else {
          this.yaCargado = true;
          this.cargando = false;
        }
      });
    };

    fetchPage(0);
  }


  actualizarPokemon(pokemonActualizado: Partial<Pokemon> & { id: number }): void {
    const listaActual = this.pokemons();

    const nuevaLista = listaActual.map(pokemon =>
      pokemon.id === pokemonActualizado.id
        ? { ...pokemon, ...pokemonActualizado }
        : pokemon
    );

    this.pokemons.set(nuevaLista);
  }

  eliminarPokemon(pokemon: Pokemon): void {
    this.pokemons.update(lista =>
      lista.filter(p => p.id !== pokemon.id)
    );
  }


}
