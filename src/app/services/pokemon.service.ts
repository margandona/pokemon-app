import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon/';

  constructor(private http: HttpClient) {}

  getPokemon(query: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${query}`);
  }
  getAllPokemon(): Observable<any> {
    return this.http.get<any>('https://pokeapi.co/api/v2/pokemon?limit=1000');
  }
  
}

