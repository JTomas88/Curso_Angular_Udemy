import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { environment } from 'environments/environment';
import type { GiphyResponse } from '../interfaces/giphy.interfaces';
import { Gif } from '../interfaces/gif.interfaces';
import { GifMapper } from '../mapper/gif.mapper';
import { map, Observable, tap } from 'rxjs';

/**
 * Lee del localstorage la clave 'gifs' que es la que hemos creado en la función saveGifsToLocalStorage, y le hemos
 * pasado lo que contiene a GIF_KEY. Recordamos que lo que tiene 'gifs' es un string en formato JSON para que pueda ser leido
 * por la consola del navegador. De modo que con el .parse lo volvemos a pasar a formato Javascript, y lo devuelve.
 * En resumen:
 * 1) Obtiene el string guardado.
 * 2) Convierte el string en un objeto real con el JSON.parse
 * 3) Devuelve ese objeto.
 *
 * Esto se usaraá en el searchHistory, lo que antes inicializábamos con un objeto vacío,
 * ahora le pasamos esta función con el historial anterior cargado desde el localStorage
 *
 * @returns
 */
const loadFromLocalStorage = () => {
  const gifsFromLocalStorage = localStorage.getItem('gifs') ?? '{}'; //Record<string, gifs[]>
  const gifs = JSON.parse(gifsFromLocalStorage);
  console.log('loadfromlocalstorage ', gifs);
  return gifs;
};

@Injectable({ providedIn: 'root' })
export class GifsService {
  private http = inject(HttpClient);

  /**
   * Creamos una variable que va a ser una señal. Será un array que contenga datos de tipo Gif.
   * Se inicializa vacía con ([])
   */
  trendingGifs = signal<Gif[]>([]);

  /**
   * Creamos una señal booleana para indicar si los gifs se están cargando(true) o no (false)
   */
  trendingGifsLoading = signal(false);

  private trendingPage = signal(0);

  trendingGifsGroup = computed<Gif[][]>(() => {
    const groups = [];
    for (let i = 0; i < this.trendingGifs().length; i += 3) {
      groups.push(this.trendingGifs().slice(i, i + 3));
    }
    console.log('groups: ', groups);

    return groups;
  });

  /** Este será el objeto que debemos almacenar en el localStorage
   * Es una señal reactiva (signal) que almacena el historial de búsqeudas de GIFs.
   * signal: crea una fuente de estado reactiva.
   * l<Record<string, Gif[]> el tipo del estado es un objeto donde la clave es un string (busqueda del usuario)
   * y el valor es un array de Gifs encontrados en esa búsqueda.
   * {} empeiza vacía (sin ninguna búsqueda aún)
   */
  //searchHistory = signal<Record<string, Gif[]>>({});
  searchHistory = signal<Record<string, Gif[]>>(loadFromLocalStorage());

  /**
   * SeñalComputada: cada vez que el searchHistory cambie se va a ejecutar el searchHistoryKeys
   * Objetc.keys: necesito sacar todas las llaves o palabras que tenga el searchHistory
   */
  searchHistoryKeys = computed(() => Object.keys(this.searchHistory()));

  constructor() {
    /**
     * Tan pronto como nuestro componente se carga empieza a llamar a la función que carga los gifs
     */
    this.loadTrendingGifs();
  }

  /**
   * Guarda en el histoal de búsquedas (searchHistory) en el localStorage cada vez que cambia, al ser una señal.
   * effect: crea un efecto reactivo: una funcíon que se ejecuta cada vez que cambia algo que depende (en este caso searchHistory())
   * this.searchHistory - obtiene el historial de bísquedas
   * JSON.stringify: converte ese historail a texto en formato JSON. Ejemplo:
   * {
   *  "perros": [ { url: "..." }, { url: "..." } ],
   *  "gatos": [ { url: "..." } ]
   * }
   * Se convierte en un string como este:
   * "{\"perros\":[{\"url\":\"...\"},{\"url\":\"...\"}],\"gatos\":[{\"url\":\"...\"}]}"

   *
   * localStorage.setItem('gifs', historyString) - guarda ese texto en el almacenamiento local del navegador con la clave "gifs".
   * Ejemplo: buscas "gato" > se guardan los GIFS en el historial > el effecte se activa > se guarda en el localStoragee algo así:
   * "gato": [gif1, gif2, gif3..]
   * Esto se puede ver en application del inspector. Aparecerá gif con las busqueda, pero si recargo la página se queda como un
   * objeto vacío, ya que el valor inicial de searchHistory es un objeto vacío ({})
   */
  saveGifsToLocalStorage = effect(() => {
    const historyString = JSON.stringify(this.searchHistory());
    localStorage.setItem('gifs', historyString);
  });

  /**
   *
   * FUNCIÓN PARA CARGAR LOS GIFS DE LA API DE GIPHY
   */
  loadTrendingGifs() {
    console.log('inicio función', this.trendingGifsLoading());

    if (this.trendingGifsLoading()) {
      return;
    }
    console.log('dentro de la función: ', this.trendingGifsLoading());
    this.trendingGifsLoading.set(true);
    console.log('cambio a true: ', this.trendingGifsLoading());

    this.http
      .get<GiphyResponse>(`${environment.giphyUrl}/gifs/trending`, {
        params: {
          api_key: environment.GiphyApiKey,
          limit: 20,
          offset: this.trendingPage() * 20,
        },
      })
      .subscribe((respuesta) => {
        /**
         *  const gifs = GifMapper.mapGiphyItemsToGifArray(respuesta.data) --> llamamos a la función que recoge un array
         * de elementos de tipo GiphyItem y los transforma a tipo Gif.
         * Por tanto en cada respuesta nos va a devolver un objeto que tiene id, title, y url --> respuesta mucho más simple.
         */
        const gifs = GifMapper.mapGiphyItemsToGifArray(respuesta.data);

        /**
         *  this.trendingGifs.set(gifs); --> colocamos en la variable trendingGifs[] los gifs que hemos obtenido en
         * la respuesta
         */
        // this.trendingGifs.set(gifs);
        this.trendingGifs.update((currentGifs) => [...currentGifs, ...gifs]);
        this.trendingPage.update((paginaActual) => paginaActual + 1);

        this.trendingGifsLoading.set(false);
        console.log(gifs);
      });
  }

  /**
   * Recibe un query --> palabra buscada por el usuario.
   * LLama a la API de Giphy. El tipo de respuesta esperada es GiphyRespone (data, meta, pagination)
   * pipe: extrae el campo data de la respuesta . Con el segundo map se transforman los GIFS del formato
   * Giphy a un formato propio GIF usando el mapper.
   * Tap: actualiza el historial de busquedas (searcHistory). Con ...history le pasa lo que ya tuviese gusardado
   * y le pasa la nueva palabra buscada (query) al nuevo valor items (array de GIFS)
   * @param query
   * @returns
   */
  searchGifs(query: string): Observable<Gif[]> {
    return this.http
      .get<GiphyResponse>(`${environment.giphyUrl}/gifs/search`, {
        params: {
          api_key: environment.GiphyApiKey,
          q: query,
          limit: 20,
        },
      })
      .pipe(
        map(({ data }) => data),
        map((items) => GifMapper.mapGiphyItemsToGifArray(items)),
        tap((items) => {
          this.searchHistory.update((history) => ({
            ...history,
            [query.toLowerCase()]: items,
          }));
        })
      );
    // .subscribe((respuesta) => {
    //   const gifs = GifMapper.mapGiphyItemsToGifArray(respuesta.data);
    //   console.log({ search: gifs });
    // });
  }

  /**
   * LLama a la señal searchHistory y devuelve su estado actual, que es un array de GIFS
   * Con el query se accede al array de GIFS bajo la palabra buscada,
   * Por ejemplo, si query = "gato", accede a searchHistoriy()['gato]
   * con el ?? si no existe esa clave o nunca se buscó esa palabra, devuelve un array vacío.
   * ESto lo llamamos en el gif-history
   * @param query
   * @returns
   */
  getHistoryGifs(query: string) {
    return this.searchHistory()[query] ?? [];
  }
}

/**
 * FLUJO COMPLETO DE SEARCHHISTORY, SAVEDGIFSTOLOCALSTORAGE Y LOADFROMLOCALSTORAGE
 *
 * SEARCHHISTORY:
 * -Es una señal reactiva que guarda el historial de búsquedas de GIFs
 * -Tiene como clave la palabra buscada (string) y como valor un array de Gif[]
 * -Se inicializa con lo que hay en el localstorage, gracias a la función loadFromLocalStorage()
 * Si no hay nada guardado, se inicializa como objeto vacío.
 *
 * LOADFROMLOCALSTORAGE:
 * -Busca en el localstorage la clave 'gifs'
 * -Si existe esa clave, la lee (como string JSON) y la convierte en un objeto con JSON.parse.
 * -Si no existe, devuelve un objeto vacío ({})
 * -Sirve para recuperar el historial de búsquedas previo al recargar la página.
 *
 * SAVEGIFSTOLOCALSTORAGE:
 * -Es un efecto reactivo que se ejecuta cada que cambiar searchHistory.
 * -Convierte el historial en un string con JSON.stringify(...)
 * -Lo guarda en localstorage bajo la clave 'gifs'
 * -Asi se persiste el historial entre sesiones o al recargar la página.
 *
 *___________________________________________________________________

 * FLUJO COMPLETO:
 * 1) Al inicial la app: loadFromLocalStorage recupera el historial guardado. Ese historial se pasa como valor inicial
 * a searchHistory.
 * 2) Cuando haces una búsqueda: se actualiza seachHistory con los nuevos GIFS encontrados.
 * El effect de saveGifsToLocalStorage detecta ese cambio y guarda el nuevo historial.
 * 3) Cuando recargas la pagina: loadFromLocalStorage vuelve a cargar lo que estaba guardado y lo asigna a searchHistory
 *
 */
