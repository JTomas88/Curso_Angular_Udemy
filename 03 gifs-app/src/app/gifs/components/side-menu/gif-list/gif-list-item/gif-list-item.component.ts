import { Component, input } from '@angular/core';

@Component({
  selector: 'gif-list-item',
  imports: [],
  templateUrl: './gif-list-item.component.html',
})
export class GifListItemComponent {
  /**
   * Declaramos la variable, que con el input va a recibir un dato de tipo string. A su vez es una señal
   * porque su contenido puede variar.
   * La variable va a recibir la información del componente padre (gif-list)
   */
  imageUrl = input.required<string>();
}
