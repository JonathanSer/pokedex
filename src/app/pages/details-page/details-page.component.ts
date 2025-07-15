import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiPokemonService } from '../../services/apiPokemon.service';
import { Pokemon } from '../../interfaces/pokemon.interfaces';
import { MatCard } from "@angular/material/card";
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { PokemonService } from '../../services/pokemon.service';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-details-page',
  imports: [
    MatCard,
    MatDividerModule,
    MatProgressBarModule,
    TitleCasePipe
  ],
  templateUrl: './details-page.component.html',
  styleUrl: './details-page.component.css',
})
export class DetailsPageComponent {
  private route = inject(ActivatedRoute);
  private api = inject(ApiPokemonService);
  private router = inject(Router);
  private pokemonService = inject(PokemonService);

  pokemon: Pokemon | null = null;

  ngOnInit(): void {
    //const id = this.route.snapshot.paramMap.get('code');
    /**if (id) {
      this.api.obtenerPokemonPorId(+id).subscribe((res) => {
        this.pokemon = res;
      });
    }*/
    this.pokemon = this.pokemonService.getPokemon();
  }

  volver(): void {
    this.router.navigate(['/dashboard']);
  }
}
