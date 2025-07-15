import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ApiPokemon } from '../interfaces/api-pokemon.interfaces';
import { forkJoin, map, Observable, switchMap } from 'rxjs';
import { Pokemon } from '../interfaces/pokemon.interfaces';
import { Tipo } from '../interfaces/tipo.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ApiPokemonService {

  http = inject(HttpClient);

  getPokemons(offset: number = 0, limit: number = 20): Observable<any[]> {
    return this.http.get<ApiPokemon>(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`).pipe(
      map((res) => res.results.map(p => this.http.get(p.url))),
      switchMap((requests) => forkJoin(requests))
    );
  }

  getTipoIconoUrls(pokemon: Pokemon): Observable<string[]> {
    const typeUrls = pokemon.types.map(t => t.type.url);
    const requests = typeUrls.map(url => this.http.get<Tipo>(url));
    return forkJoin(requests).pipe(
      map((typeResponses: Tipo[]) =>
        typeResponses.map(res => res.sprites['generation-viii']['sword-shield'].name_icon)
      )
    );
  }

}
