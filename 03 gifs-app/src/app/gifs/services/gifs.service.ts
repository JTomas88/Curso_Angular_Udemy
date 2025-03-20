import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
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

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private http = inject(HttpClient);

  trendingGifs = signal<Gif[]>([]);
  trendingGifsLoading = signal(true);

  searchHistory = signal<Record<string, Gif[]>>({});
  searchHistoryWords = computed(() => Object.keys(this.searchHistory()));

  constructor() {
    this.loadTrendingGifs();
  }

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
