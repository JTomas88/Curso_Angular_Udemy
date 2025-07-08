import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CountrySearchInputComponent } from '../../component/country-search-input/country-search-input.component';
import { CountryListComponent } from '../../component/country-list/country-list.component';

@Component({
  selector: 'app-by-country-page',
  imports: [CountrySearchInputComponent, CountryListComponent],
  templateUrl: './by-country-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByCountryPageComponent {}
