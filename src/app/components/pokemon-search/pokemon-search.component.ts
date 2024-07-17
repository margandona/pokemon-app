import { Component } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-pokemon-search',
  templateUrl: './pokemon-search.component.html',
  styleUrls: ['./pokemon-search.component.scss'],
})
export class PokemonSearchComponent {
  searchQuery: string = '';
  filteredPokemon: any[] = [];
  pokemonData: any;

  constructor(private pokemonService: PokemonService) {}

  onSearchChange(event: any) {
    const query = event.target.value.toLowerCase();
    if (query && query.length > 1) {
      this.pokemonService.getPokemon(query).subscribe(
        (data) => {
          this.pokemonData = data;
          this.filteredPokemon = [data];
        },
        (error) => {
          this.filteredPokemon = [];
        }
      );
    } else {
      this.filteredPokemon = [];
      this.pokemonData = null;
    }
  }
}
