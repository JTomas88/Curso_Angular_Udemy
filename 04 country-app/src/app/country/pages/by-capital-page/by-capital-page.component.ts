import { Component, inject, input } from '@angular/core';
import { CountrySearchInputComponent } from '../../component/country-search-input/country-search-input.component';
import { CountryListComponent } from '../../component/country-list/country-list.component';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-by-capital-page',
  imports: [CountrySearchInputComponent, CountryListComponent],
  templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent {
  countryService = inject(CountryService);

  buscarPorCapital(query: string) {
    console.log({ query });
    this.countryService.searchByCapital(query).subscribe((respuesta) => {
      console.log(respuesta);
    });
  }
}
