import { Component, inject, signal } from '@angular/core';
import { GifListComponent } from '../../components/side-menu/gif-list/gif-list.component';
import { GifsService } from '../../services/gifs.services';
import { Gif } from '../../interfaces/gif.interfaces';

@Component({
  selector: 'app-search-page',
  imports: [GifListComponent],
  templateUrl: './search-page.component.html',
})
export default class SearchPageComponent {
  gifService = inject(GifsService);
  gifs = signal<Gif[]>([]);

  onSearch(query: string) {
    this.gifService.searchGifs(query).subscribe((respuesta) => {
      this.gifs.set(respuesta);
      //console.log(respuesta);
    });
  }
}
