import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'gif-list-item',
  imports: [],
  templateUrl: './gif-list-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GifListItemComponent {
  /**
   * Definimos una variable que recibe de manera obligatoria mediante el input un string, recibe los datos desde el exterior
   * Es una SEÑAL --> CAMBIO EN EL HTML
   */
  imageUrl = input.required<string>();
}
