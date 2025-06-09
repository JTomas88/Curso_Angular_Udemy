import { Component } from '@angular/core';

import { environment } from 'environments/environment';
// import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'gif-side-menu-header',
  imports: [],
  templateUrl: './side-menu-header.component.html',
})
export class SideMenuHeaderComponent {
  /**
   * Creamos una property que haga referencia al archivo environment.ts, se importa arriba con su ruta
   */
  environment = environment;
}
