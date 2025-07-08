import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopMenuComponentComponent } from '../../component/topMenuComponent/topMenuComponent.component';

@Component({
  selector: 'app-country-layout',
  imports: [RouterOutlet, TopMenuComponentComponent],
  templateUrl: './CountryLayout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryLayoutComponent {}
