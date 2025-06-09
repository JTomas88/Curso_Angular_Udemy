import { Routes } from '@angular/router';

export const routes: Routes = [
  /**
   * Para que no de problema con el "loadComponent" nos vamos al componente, y ponemos el default --> xport default class DashboardPageComponent {}
   */
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./gifs/pages/dashboard-page/dashboard-page.component'),

    /**
     * Rutas hijas: aparecerán detrás de la ruta padre, en este caso dashboard.
     * Ejemplo_ http://localhost:56005/dashboard/search
     */
    children: [
      {
        path: 'trending',
        loadComponent: () =>
          import('./gifs/pages/trending-page/trending-page.component'),
      },

      {
        path: 'search',
        loadComponent: () =>
          import('./gifs/pages/search-page/search-page.component'),
      },

      // Para mandar argumentos dinámicos en la ruta (por ejemplo, la palabra que estamos buscando en el buscador, se pone con
      // :/ y lo que queramos recibir. Se pueden poner tantos como queramos)
      {
        path: 'history/:query',
        loadComponent: () =>
          import('./gifs/pages/gif-history/gif-history.component'),
      },

      /**
       * Si dentro de las rutas hijas no encontramos ninguna que coincida con las anteriores, redirigimos a trending
       */
      {
        path: '**',
        redirectTo: 'trending',
      },
    ],
  },

  /**
   * Comodín: Cualquier otra ruta que no esté definida, será redirigida al dashboard
   */
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];
