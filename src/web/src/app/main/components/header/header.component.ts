// Angular
import { Component, effect, inject, model, OnInit, output, signal } from '@angular/core';
// Core UI
import { CoreIcon, bars } from '../../../shared/components/core-icon';
import { CoreThemeSwitchModule } from '../../../shared/components/core-theme-switch';
import { CoreButtonModule } from '../../../shared/components/core-button';
// Services
import { ThemeService } from '../../../shared/services/theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  imports: [CoreButtonModule, CoreThemeSwitchModule],
})
export class HeaderComponent implements OnInit {
  // [ Public ]
  public toggleNavigationPanel = output<void>();

  // [ Internal ]

  public theme = model<'light' | 'dark'>('dark');
  public menuIcon: CoreIcon = bars;
  public appTitle = signal<string>('Travel Places Tracker');

  // [ Dependencies ]

  private _themeService = inject(ThemeService);

  constructor() {
    // Set theme on change
    effect(() => {
      this._themeService.setTheme(this.theme());
    });
  }

  // [ Lifecycle ]

  public ngOnInit(): void {
    // Set initial theme
    this.theme.set(this._themeService.getTheme() ?? 'dark');
  }

  // [ Events ]

  public onToggleNavigationClick(): void {
    this.toggleNavigationPanel.emit();
  }
}
