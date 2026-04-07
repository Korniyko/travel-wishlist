import { Injectable, signal } from '@angular/core';
import { Place } from '../places/places.interfaces';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private readonly STORAGE_KEY = 'travel-wishlist-favorites';
  public favorites = signal<Place[]>([]);

  constructor() {
    this.loadFavorites();
  }

  private loadFavorites(): void {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        this.favorites.set(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
      this.favorites.set([]);
    }
  }

  private saveToLocalStorage(data: Place[]): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving favorites:', error);
    }
  }

  public addFavorite(place: Place): void {
    const current = this.favorites();
    // Check if the place is already in favorites to avoid duplicates
    if (!current.find((p: Place) => p.id === place.id)) {
      const updated = [...current, place];
      this.favorites.set(updated);
      this.saveToLocalStorage(updated);
    }
  }

  public removeFavorite(place: Place): void {
    const current = this.favorites();
    const updated = current.filter((p: Place) => p.id !== place.id);
    this.favorites.set(updated);
    this.saveToLocalStorage(updated);
  }
}
