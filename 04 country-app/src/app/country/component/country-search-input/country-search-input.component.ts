import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './country-search-input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountrySearchInputComponent {
  countryService = inject(CountryService);

  //Emite un valor hacia el componente padre (by-capital-page)
  value = output<string>();

  // placeHolderRecibido es un input porque está esperando un string (por defecto con la palabra buscar). ESte placeHolderRecibido
  // es el que irá a la derecha del igual para que la etiqueta del placeholder del input muestre su contenido
  placeholderRecibido = input<string>('Buscar');

  emitirBusqueda(value: string) {
    const busqueda: string = '';
    this.value.emit(busqueda);
    console.log(value);
  }
}
