import { Component, computed, inject, signal } from '@angular/core';
import { CharacterListComponent } from '../../components/dragonball/character-list/character-list.component';
import { CharacterAddComponent } from '../../components/dragonball/character-add/character-add.component';
import { DragonBallService } from '../../services/dragonball.service';

interface Character {
  id: number;
  name: string;
  power: number;
}

@Component({
  selector: 'dragonball-super',
  imports: [CharacterListComponent, CharacterAddComponent],
  templateUrl: './dragonball-super-page.component.html',
})
export class DragonballSuperPageComponent {
  // name = signal('');
  // power = signal(0);

  //Hay dos formas para inyectar las dependencias del servicio.

  // constructor(
  //   public dragonballservice: DragonBallService
  // ){}

  public dragonballService = inject(DragonBallService);

  ////////////////////////////////////////////////////////////////

  // characters = signal<Character[]>([
  //   { id: 1, name: 'Goku', power: 9001 },
  //   { id: 2, name: 'Vegeta', power: 8000 },
  // ]);
  // addCharacter(character: Character) {
  //   this.characters.update((list) => [...list, character]);
  // }
  // resetFields() {
  //   this.name.set('');
  //   this.power.set(0);
  // }
}
