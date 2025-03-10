import { UpperCasePipe } from '@angular/common';
import { Component, computed, signal } from '@angular/core';

@Component({
  templateUrl: './hero-page-component.html',
  imports: [UpperCasePipe],
})
export class HeroPageComponent {
  nameSignal = signal('Ironman');
  ageSignal = signal(45);

  //Señal computada
  heroDescription = computed(() => {
    const description = `${this.nameSignal()} - ${this.ageSignal()}`;
    return description;
  });

  // getHeroDescription() {
  //   return `${this.nameSignal()} - ${this.ageSignal()}`;
  // }

  //Señal computada
  capitalizedName = computed(() => this.nameSignal().toUpperCase());

  changeHero() {
    this.nameSignal.set('Spiderman');
    this.ageSignal.set(22);
  }

  resetForm() {
    this.nameSignal.set('Ironman');
    this.ageSignal.set(45);
  }

  changeAge() {
    this.ageSignal.set(60);
  }

  capitalizarNombre() {
    return this.nameSignal().toUpperCase;
  }
}
