// Angular
import { Component, inject } from '@angular/core';
// Services
import { FavoritesService } from './favorites.service';
// Components
import { PlacesListComponent } from '../../../shared/components/places-list/places-list.component';
// Core UI
import { CoreIconModule } from '../../../shared/components/core-icon';
// Icons
import { infoSolidIcon } from '@progress/kendo-svg-icons';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss',
  imports: [PlacesListComponent, CoreIconModule],
})
export class FavoritesComponent {
  // Dependencies
  public favoritesService = inject(FavoritesService);
  // Icons
  public infoSolidIcon = infoSolidIcon;
}
