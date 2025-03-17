import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { GifListItemComponent } from './gif-list-item/gif-list-item.component';
import { Gif } from '../../interfaces/gif.interface';

@Component({
  selector: 'gif-list',
  imports: [GifListItemComponent],
  templateUrl: './gif-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GifListComponent {
  /**
   * Declaramos una variable gifs que recibe a través del input un arreglo de Gifs.
   * Este arreglo de Gifs es una señal.
   */
  gifs = input.required<Gif[]>();
}
