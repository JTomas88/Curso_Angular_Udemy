import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  signal,
} from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './country-search-input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountrySearchInputComponent {
  value = output<string>();

  // placeHolderRecibido es un input porque está esperando un string (por defecto con la palabra buscar). ESte placeHolderRecibido
  // es el que irá a la derecha del igual para que la etiqueta del placeholder del input muestre su contenido
  placeholderRecibido = input<string>('Buscar');

  onSearch(value: string) {
    const busqueda: string = '';
    this.value.emit(busqueda);
    console.log(value);
  }
}
