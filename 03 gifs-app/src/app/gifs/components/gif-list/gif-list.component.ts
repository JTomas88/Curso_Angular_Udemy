import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { GifListItemComponent } from './gif-list-item/gif-list-item.component';

@Component({
  selector: 'gif-list',
  imports: [GifListItemComponent],
  templateUrl: './gif-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GifListComponent {
  /**
   * Declaramos una variable gifs que recibe a través del input un arreglo de strings.
   * Este arreglo de strings es una señal.
   */
  gifs = input.required<string[]>();
}
