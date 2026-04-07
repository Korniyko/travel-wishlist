// Angular
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  public theme$ = new BehaviorSubject<'light' | 'dark'>(this.getTheme());
  public themeChanged = new Subject<void>();

  public initialize(): void {
    const currentTheme = this.getTheme();
    this.setTheme(currentTheme);
  }

  public getTheme(): 'light' | 'dark' {
    // Get the theme from the local storage
    const theme = (localStorage.getItem('theme') as 'light' | 'dark') ?? 'dark';
    // Return the theme
    return theme;
  }

  public setTheme(theme: 'light' | 'dark'): void {
    // Set the theme in the local storage
    localStorage.setItem('theme', theme);
    // Apply the theme
    this.applyTheme(theme);
    // Notify subscribers about the theme change
    setTimeout(() => {
      this.themeChanged.next();
    }, 100);
  }

  public applyTheme(theme: 'light' | 'dark'): void {
    // Get theme css link element
    const themeLink = document.getElementById('core-theme') as HTMLLinkElement;
    // Set the theme
    themeLink.href = `themes/${theme}-theme.css`;
    this.theme$.next(theme);
  }
}
