import { Component, input } from '@angular/core';
import { GifListItemComponent } from './gif-list-item/gif-list-item.component';
import { Gif } from 'src/app/gifs/interfaces/gif.interfaces';

@Component({
  selector: 'gif-list',
  imports: [GifListItemComponent],
  templateUrl: './gif-list.component.html',
})
export class GifListComponent {
  /**
   * Con la variable gifs estamos indicando que va a recibir un array de strings, que a su vez también seran una señal.
   */
  gifs = input.required<Gif[]>();
}
