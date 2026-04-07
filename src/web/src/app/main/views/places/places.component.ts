// Angular
import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
// Core UI
import { CoreSpinnerComponent } from '../../../shared/components/core-spinner/core-spinner.component';
import { CoreButtonModule } from '../../../shared/components/core-button';
import { CoreIconModule } from '../../../shared/components/core-icon';
// Services
import { PlacesService } from './places.service';
// Kendo UI
import { KENDO_INPUTS } from '@progress/kendo-angular-inputs';
import { KENDO_LABELS } from '@progress/kendo-angular-label';
import { infoSolidIcon, searchIcon } from '@progress/kendo-svg-icons';
// Interfaces
import { Place } from './places.interfaces';
// Components
import { PlacesListComponent } from '../../../shared/components/places-list/places-list.component';

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrl: './places.component.scss',
  host: { class: 'view-component flex-column fade-in' },
  providers: [PlacesService],
  imports: [
    CommonModule,
    CoreSpinnerComponent,
    KENDO_INPUTS,
    KENDO_LABELS,
    CoreButtonModule,
    PlacesListComponent,
    CoreIconModule,
  ],
})
export class PlacesComponent {
  // Signals
  public data = signal<Place[]>([]);
  public place = signal<string>('Coffee');
  public city = signal<string>('Kyiv');
  public count = signal<number>(5);
  public loading = signal<boolean>(false);
  // Icons
  public searchIcon = searchIcon;
  public infoSolidIcon = infoSolidIcon;
  // Dependencies
  public _service = inject(PlacesService);

  public async onSearch(): Promise<void> {
    this.loading.set(true);
    const query = {
      place: this.place(),
      city: this.city(),
      count: this.count(),
    };
    try {
      const places = await this._service.searchPlaces(query);
      this.data.set(places);
    } finally {
      this.loading.set(false);
    }
  }
}
