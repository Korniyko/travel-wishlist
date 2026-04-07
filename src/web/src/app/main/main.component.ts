// Angular
import { Component, inject, signal } from '@angular/core';
// Kendo UI
import { mapMarkerIcon, starIcon } from '@progress/kendo-svg-icons';
// Components
import { HeaderComponent } from './components/header/header.component';
// Core UI
import { CoreNavigationItem } from '../shared/components/core-navigation';
import { CoreNavigationModule } from '../shared/components/core-navigation/core-navigation.module';
import { CoreSpinnerComponent } from '../shared/components/core-spinner/core-spinner.component';
// Services
import { ThemeService } from '../shared/services/theme.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
  host: { class: 'view-component fade-in' },
  imports: [HeaderComponent, CoreNavigationModule, CoreSpinnerComponent],
})
export class MainComponent {
  // [ Public ]
  public navigationItems = signal<CoreNavigationItem[]>([]);
  public navigationIsExpanded = signal(true);
  public theme = signal<'light' | 'dark'>('dark');
  public initializedMain = signal(false);
  public year = signal(new Date().getFullYear());

  private _themeService = inject(ThemeService);

  // [ Lifecycle ]

  public ngOnInit(): void {
    void this.initializeMain();
  }

  // [ Events ]

  public onToggleNavigationPanel(): void {
    this.navigationIsExpanded.set(!this.navigationIsExpanded());
  }

  // [ Private methods ]

  private async initializeMain(): Promise<void> {
    this.navigationItems.set(this.getNavigationItems());
    this.loadTheme();
    this.initializedMain.set(true);
  }

  private loadTheme(): void {
    this.theme.set(this._themeService.getTheme());
  }

  private getNavigationItems(): CoreNavigationItem[] {
    const items: CoreNavigationItem[] = [];

    items.push(
      {
        id: 'places',
        label: 'Places',
        route: 'places',
        icon: mapMarkerIcon,
      },
      {
        id: 'favorites',
        label: 'Favorites',
        route: 'favorites',
        icon: starIcon,
      },
    );

    return items;
  }
}
