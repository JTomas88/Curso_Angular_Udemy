import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
import type { GiphyResponse } from '../interfaces/gyphy.interfaces';
import { Gif } from '../interfaces/gif.interface';
import { GifMapper } from '../mapper/gif.mapper';
import { map, Observable, tap } from 'rxjs';

// {
//   'goku': [gif1, gif2, gif3]
//   'saitama': [gif1, gif2, gif3]
//   'perros': [gif1, gif2, gif3]
// }

//Lo de arriba sería algo así:
// Record<string, Gif[]>

const loadFromLocalStorage = () => {
  const gifsFromLocalStorage = localStorage.getItem('gifs') ?? '{}'; //Record <string, gifs [];
  const gifs = JSON.parse(gifsFromLocalStorage);
  return gifs;
};

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private http = inject(HttpClient);

  trendingGifs = signal<Gif[]>([]);
  trendingGifsLoading = signal(true);

  searchHistory = signal<Record<string, Gif[]>>(loadFromLocalStorage());
  searchHistoryWords = computed(() => Object.keys(this.searchHistory()));

  constructor() {
    this.loadTrendingGifs();
  }

  /**
   * Creamos este efecto, que se va a disparar cada vez que nuestra señal searchHistory cambie.
   * Luego almacenamos en el localStorage, y le pasamos el valor que hemos creado historyString.
   * Esto ya graba en nuestro localStorage, pero no almancena si recargamos el navegador, ya que
   * más arriba el valor de searchHistory está vacío y por eso al recargar se sobreescribe.
   * Creamos la función loadFromLocalStorag y se lo pasamos a la señal searchHistory
   */
  saveGifsToLocalStorage = effect(() => {
    const historyString = JSON.stringify(this.searchHistory());
    localStorage.setItem('gifs', historyString);
  });

  loadTrendingGifs() {
    this.http
      .get<GiphyResponse>(`${environment.giphyUrl}/gifs/trending`, {
        params: {
          api_key: environment.giphyApiKey,
          limit: 20,
        },
      })
      .subscribe((respuesta) => {
        // console.log(respuesta);
        const gifs = GifMapper.mapGiphyItemsToGifArray(respuesta.data);
        this.trendingGifs.set(gifs);
        this.trendingGifsLoading.set(false);
        console.log(gifs);
      });
  }

  searchGifs(query: string): Observable<Gif[]> {
    return this.http
      .get<GiphyResponse>(`${environment.giphyUrl}/gifs/search`, {
        params: {
          api_key: environment.giphyApiKey,
          q: query,
          limit: 20,
        },
      })
      .pipe(
        map(({ data }) => data), // Extrae el array de GIFs de la respuesta
        map((items) => GifMapper.mapGiphyItemsToGifArray(items)), // Transforma los GIFs

        //AÑADIR HISTORIAL
        tap((items) => {
          this.searchHistory.update((history) => ({
            ...history,
            [query.toLowerCase()]: items,
          }));
        })
      );

    // .subscribe((respuesta) => {
    //   // console.log(respuesta);
    //   const gifs = GifMapper.mapGiphyItemsToGifArray(respuesta.data);

    //   console.log({ Search: gifs });
    // });
  }

  getHistoryGifs(query: string): Gif[] {
    return this.searchHistory()[query] ?? [];
  }
}
