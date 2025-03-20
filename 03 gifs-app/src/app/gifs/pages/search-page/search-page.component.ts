import { Component, inject, signal } from '@angular/core';
import { GifListComponent } from '../../components/gif-list/gif-list.component';
import { GifsService } from '../../services/gifs.service';
import { Gif } from '../../interfaces/gif.interface';

@Component({
  selector: 'app-search-page',
  imports: [GifListComponent],
  templateUrl: './search-page.component.html',
})
export default class SearchPageComponent {
  GifsService = inject(GifsService);
  gifsAMostrar = signal<Gif[]>([]);

  onSearch(query: string) {
    this.GifsService.searchGifs(query).subscribe((respuesta) => {
      this.gifsAMostrar.set(respuesta);
    });
  }
}
