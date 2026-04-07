import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';

export const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'places',
        // Lazy load the PlacesComponent when the 'places' route is accessed
        loadComponent: () =>
          import('./main/views/places/places.component').then((m) => m.PlacesComponent),
      },
      {
        path: 'favorites',
        // Lazy load the FavoritesComponent when the 'favorites' route is accessed
        loadComponent: () =>
          import('./main/views/favorites/favorites.component').then((m) => m.FavoritesComponent),
      },
    ],
  },
];
