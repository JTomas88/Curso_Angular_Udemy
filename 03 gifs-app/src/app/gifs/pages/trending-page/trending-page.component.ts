import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  viewChild,
} from '@angular/core';
import { GifsService } from '../../services/gifs.services';
import { ScrollstateService } from 'src/shared/services/scroll-state.service';

// const imageUrls: string[] = [
//   'https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg',
//   'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg',
//   'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg',
//   'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg',
//   'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg',
//   'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg',
//   'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-6.jpg',
//   'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-7.jpg',
//   'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-8.jpg',
//   'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-9.jpg',
//   'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-10.jpg',
//   'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-11.jpg',
// ];

@Component({
  selector: 'app-trending-page',
  templateUrl: './trending-page.component.html',
})
export default class TrendingPageComponent implements AfterViewInit {
  gifService = inject(GifsService);
  scrollStateService = inject(ScrollstateService);

  /**
   * Es una función reactiva que podemos llamar para obtener el <div> real, como si fuese un document.querySelector('#groupDiv')
   * viewChild buscar un elemento en el HTML, en este caso está buscando el elemento etiquetado como 'groupDiv'.
   * <ElementRef<HTMLDivElement>>:  indica que queremos obtener una referencia al elemento real del DOM (en este caso un div)
   */
  scrollDivRef = viewChild<ElementRef<HTMLDivElement>>('groupDiv');

  ngAfterViewInit(): void {
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if (!scrollDiv) return;
    scrollDiv.scrollTop = this.scrollStateService.trendingScrollState();
  }

  /**
   *
   * En scrollDiv guardamos lo que obtenermos de llamar a scrollDivRef, es decir accedemos al div real del DOM.
   * scrollTop: cantidad de pixeles de los que hemos hecho scoll desde arriba hasta donde estemos situados.
   * clientHeight: la parte visible del div que aparece en pantalla, sin contar lo que haya debajo que no veamos.
   * scrollHeight: alto total del div scrolleado (parte visita + oculta).
   * ¿Como sabemos cuando estamos al final para añadir más contenido? Eso nos lo da la variable "enElFinal"
   * "enElFinal actua como un booleano. Mientras bajamos aparecerá como valor false, y cuando no haya más scroll
   * aparecerá con el valor true"
   */
  onScroll(event: Event) {
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if (!scrollDiv) return;
    const scrollTop = scrollDiv.scrollTop;
    const clientHeight = scrollDiv.clientHeight;
    const scrollHeight = scrollDiv.scrollHeight;
    const enElFinal = scrollTop + clientHeight + 300 >= scrollHeight;

    // console.log({ scrollTotal: scrollTop + clientHeight, scrollHeight });
    // console.log({ enElFinal });

    this.scrollStateService.trendingScrollState.set(scrollTop);

    if (enElFinal) {
      this.gifService.loadTrendingGifs();
    }
  }
}
