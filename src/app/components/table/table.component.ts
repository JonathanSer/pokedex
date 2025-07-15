import { ApiPokemonService } from './../../services/apiPokemon.service';
import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Pokemon } from '../../interfaces/pokemon.interfaces';
import { TitleCasePipe } from '@angular/common';
import { Router } from '@angular/router';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-table',
  imports: [
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    TitleCasePipe
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent {

  private apiPokemon = inject(ApiPokemonService);
  private router = inject(Router);
  private pokemonService = inject(PokemonService);

  tipoIconosMap: { [pokemonId: number]: string[] } = {};

  columnas: string[] = ['nro', 'imagen', 'nombre', 'tipo', 'acciones'];

  dataSource = signal<Pokemon[]>([]);

  filtrarTexto = input<string>();

  paginaActual = signal(0);
  tamanioPagina = 8;

  ngOnInit(): void {
    this.pokemonService.loadAllPokemons();
  }

  pokemonEfecto = effect(() => {
    const pokemons = this.pokemonService.getPokemons();
    const tipoIconosMap = this.pokemonService.gettipoIconosMap();
    if (pokemons && pokemons.length > 0) {
      this.dataSource.set(pokemons);
    }
    if (tipoIconosMap) {
      this.tipoIconosMap = tipoIconosMap;
    }
  });

  pokemonsFiltrados = computed(() => {
    const filtro = this.filtrarTexto()?.toLowerCase() ?? '';
    const pokemonsFiltrados = this.dataSource().filter(pokemon =>
      pokemon.name.toLowerCase().includes(filtro)
    );

    const inicio = this.paginaActual() * this.tamanioPagina;
    return pokemonsFiltrados.slice(inicio, inicio + this.tamanioPagina);
  });

  getTypesAsUrl(pokemon: Pokemon): string[] {
    return this.tipoIconosMap[pokemon.id] || [];
  }

  irADetalle(pokemon: Pokemon) {
    this.router.navigate(['/dashboard/by', pokemon.id]);
    this.pokemonService.setPokemon(pokemon);
  }

  editar(pokemon: Pokemon) {
    this.router.navigate(['/dashboard/editar', pokemon.id]);
    this.pokemonService.setPokemon(pokemon);
  }

  eliminarPokemon(pokemon: Pokemon) {
    this.pokemonService.eliminarPokemon(pokemon);
  }


  siguientePagina(): void {
    const filtro = this.filtrarTexto()?.toLowerCase() ?? '';
    const totalFiltrados = this.dataSource()
      .filter(pokemon => pokemon.name.toLowerCase().includes(filtro)).length;

    const totalPaginas = Math.ceil(totalFiltrados / this.tamanioPagina);
    if (this.paginaActual() < totalPaginas - 1) {
      this.paginaActual.set(this.paginaActual() + 1);
    }
  }

  paginaAnterior(): void {
    if (this.paginaActual() > 0) {
      this.paginaActual.set(this.paginaActual() - 1);
    }
  }

  esUltimaPagina(): boolean {
    const filtro = this.filtrarTexto()?.toLowerCase() ?? '';
    const totalFiltrados = this.dataSource()
      .filter(pokemon => pokemon.name.toLowerCase().includes(filtro))
      .length;

    return totalFiltrados <= (this.paginaActual() + 1) * this.tamanioPagina;
  }

}
