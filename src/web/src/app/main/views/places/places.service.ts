// Angular
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
// Interfaces
import { Place } from './places.interfaces';

@Injectable()
export class PlacesService {
  private _http = inject(HttpClient);

  public async searchPlaces(query: {
    place: string;
    city: string;
    count: number;
  }): Promise<Place[]> {
    const response$ = this._http.get<any>('http://localhost:5001/api/places', {
      params: { query: query.place, near: query.city, limit: query.count.toString() },
    });
    const data = await firstValueFrom(response$);

    return this.mapFoursquareToPlaces(data.results || []);
  }

  // [ Helpers ]

  private mapFoursquareToPlaces(results: any[]): Place[] {
    return results.map((item) => ({
      id: item.fsq_id ?? '',
      name: item.name ?? 'Unknown',
      category: item.categories && item.categories.length > 0 ? item.categories[0].name : 'Unknown',
      address: item.location?.formatted_address ?? item.location?.address ?? 'No address',
      city: item.location?.locality ?? '',
      imgUrl: this.getCategoryIcon(item.categories),
      instagramUrl: this.getInstagramUrl(item.social_media?.instagram),
    }));
  }

  private getCategoryIcon(categories: any[]): string {
    if (!categories || categories.length === 0) {
      return '';
    }
    const icon = categories[0].icon;
    if (icon?.prefix && icon?.suffix) {
      return `${icon.prefix}bg_64${icon.suffix}`;
    }
    return '';
  }

  private getInstagramUrl(username: string | undefined): string {
    return username ? `https://instagram.com/${username}` : '';
  }
}
