import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-pokemon-search',
  templateUrl: './pokemon-search.component.html',
  styleUrls: ['./pokemon-search.component.scss'],
})
export class PokemonSearchComponent implements OnInit {
  searchQuery: string = '';
  allPokemon: any[] = [];
  filteredPokemon: any[] = [];
  pokemonData: any;

  constructor(private pokemonService: PokemonService) {}

  ngOnInit() {
    this.pokemonService.getAllPokemon().subscribe((response) => {
      this.allPokemon = response.results;
    });
  }

  onSearchChange(event: any) {
    const query = event.target.value.toLowerCase();
    if (query && query.length > 1) {
      this.filteredPokemon = this.allPokemon.filter((pokemon) =>
        pokemon.name.includes(query)
      );
    } else {
      this.filteredPokemon = [];
      this.pokemonData = null;
    }
  }

  getPokemonDetails(name: string) {
    this.pokemonService.getPokemon(name).subscribe(
      (data) => {
        this.pokemonData = data;
        this.filteredPokemon = [data];
      },
      (error) => {
        this.filteredPokemon = [];
      }
    );
  }
}
