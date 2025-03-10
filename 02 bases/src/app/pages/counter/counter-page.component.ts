import { Component, signal } from '@angular/core';

@Component({
  templateUrl: './counter-page.component.html',
})
export class CounterPageComponent {
  counter = 10;

  //Es una WritableSignal > es una señal que se puede escribir
  counterSignal = signal(20);

  increaseBy(value: number) {
    this.counter += value;

    //Cuando tenemos una actualización del valor de una señal (a 0) pero dependen del valor anterior de una señal
    //(10) se recomienda usar update.
    this.counterSignal.update((current) => current + value);
  }

  resetCounter() {
    this.counter = 0;

    //Usamos .set para establecer un nuevo valor de la señal (estaba en 10 y pasará a 0)
    this.counterSignal.set(0);
  }
}
