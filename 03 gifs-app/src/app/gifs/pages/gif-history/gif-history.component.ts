import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { GifsService } from '../../services/gifs.services';
import { GifListComponent } from '../../components/side-menu/gif-list/gif-list.component';

@Component({
  selector: 'app-gif-history',
  imports: [GifListComponent],
  templateUrl: './gif-history.component.html',
})
export default class GifHistoryComponent {
  gifsService = inject(GifsService);

  /**
   * inject(ActivatedRoute) --> representa la ruta que está activa en Angular
   * Escucha los parámetros dinámicos de la URL usando .params.subscribe(....)
   * Cada vez que los parámetros cambian, por ejemplo al navegar a otra url con otra query
   * diferente, se imprime el valor por consola
   *
   */
  query = inject(ActivatedRoute).params.subscribe((params) => {
    console.log(params['query']);
  });

  /** AVANCE DEL PRIMER QUERY, MUCHO MAS SENCILLO
   * Cualquier observable que tengamos lo vamos a transformar en una señal.
   * Cuando el observable emite un valor, se actualiza el valor de query
   * Se obtienen TODOS los parámetros, por eso usamos el pipe-map, con el que extraemos lo que
   * nos interesa que es el query
   *
   */
  query2 = toSignal(
    inject(ActivatedRoute).params.pipe(map((params) => params['query']))
  );

  /**
   * ES una señal computada que mira el valor del parámetro query en la URL y devuelve los GIFS asociados
   * desde el historial.
   * Ejemplo: si la url es -->  /search?query2=perro
   * this.query2 --> 'perro'
   * gifsByKey --> this.gifsSErvice.getHistoryGifs('perro')
   */
  gifsByKey = computed(() => {
    return this.gifsService.getHistoryGifs(this.query2());
  });
}
