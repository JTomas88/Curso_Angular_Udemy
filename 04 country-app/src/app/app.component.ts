import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './country/component/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FooterComponent],
  templateUrl: './app.component.html',
})
export class App {
  protected title = 'country-app';
}
