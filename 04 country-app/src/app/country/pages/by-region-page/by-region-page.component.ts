import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CountryListComponent } from '../../component/country-list/country-list.component';

@Component({
  selector: 'app-by-region-page',
  imports: [CountryListComponent],
  templateUrl: './by-region-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByRegionPageComponent {}
