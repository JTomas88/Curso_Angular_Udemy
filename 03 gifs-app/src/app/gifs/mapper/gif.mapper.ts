import { Gif } from '../interfaces/gif.interfaces';
import { GiphyItem } from '../interfaces/giphy.interfaces';

// Gif: es una interfaz que solo tiene los atributos id, title y url - La hemos creado nosotros
// GiphyItem: es la interfaz que trae cada Gif desde la API y que tiene muchos atributos

/**
 * Esta función recibe un item de tipo GiphyItem (muchos atributos) y tiene que devolver un objeto
 * de tipo Gif (id, title y url)
 * Es decir, escogemos solo los datos que nos interesan y descartamos el resto.
 */

export class GifMapper {
  static mapGiphyItemToGif(item: GiphyItem): Gif {
    return {
      id: item.id,
      title: item.title,
      url: item.images.original.url,
    };
  }

  /**
   * Esta función recibe un array del tipo GiphyItem y tiene que devolver un array de tipo Gif
   * @param items: array de tipo GiphyItem
   * @returns con el map transforma cada uno de los GiphyItem en Gif
   * es decir, transforma cada elemento del array que tiene muchas propiedades, en un elemento con id, tittle y url.
   */

  static mapGiphyItemsToGifArray(items: GiphyItem[]): Gif[] {
    return items.map(this.mapGiphyItemToGif);
  }
}
