// Angular
import { AfterViewInit, Component, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
// Kendo UI
import { SwitchModule } from '@progress/kendo-angular-inputs';

@Component({
  selector: 'core-theme-switch',
  templateUrl: './core-theme-switch.component.html',
  imports: [FormsModule, SwitchModule],
})
export class CoreThemeSwitchComponent implements AfterViewInit {
  // Inputs
  public theme = model.required<'light' | 'dark'>();

  public ngAfterViewInit() {
    // Replace 'on' label with moon icon
    const onLabelSelector = document.querySelector('core-theme-switch .k-switch-label-on');
    const moonSvgContainer = document.createElement('div');
    moonSvgContainer.innerHTML = `<svg width="28" height="28" viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><path clip-rule="evenodd" d="M7.5 12a7.348 7.348 0 0 1 1.1-3.888 6.664 6.664 0 0 1 2.943-2.578 6.157 6.157 0 0 1 3.784-.4l.182.042a6.77 6.77 0 0 0-1.993 2.06 7.347 7.347 0 0 0-1.1 3.889 7.252 7.252 0 0 0 1.918 4.95c.85.92 1.951 1.57 3.166 1.875A6.24 6.24 0 0 1 14.05 19a6.342 6.342 0 0 1-4.632-2.05A7.252 7.252 0 0 1 7.5 12Z" stroke="var(--kendo-color-on-dark)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
    onLabelSelector?.parentNode?.replaceChild(moonSvgContainer.firstChild!, onLabelSelector);
    // Replace 'off' label with sun icon
    const offLabelSelector = document.querySelector('core-theme-switch .k-switch-label-off');
    const sunSvgContainer = document.createElement('div');
    sunSvgContainer.innerHTML = `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 3v1m0 16v1m-8-9H3m3.314-5.686L5.5 5.5m12.186.814L18.5 5.5M6.314 17.69l-.814.81m12.186-.81.814.81M21 12h-1m-4 0a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" stroke="var(--kendo-color-on-app-surface)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
    offLabelSelector?.parentNode?.replaceChild(sunSvgContainer.firstChild!, offLabelSelector);
  }

  // Events
  public onToggleTheme(checked: boolean): void {
    this.theme.set(checked ? 'dark' : 'light');
  }
}
