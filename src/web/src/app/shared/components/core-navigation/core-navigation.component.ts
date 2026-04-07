// Angular
import { Component, computed, inject, input, model, OnInit, output, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { NgClass, NgStyle } from '@angular/common';
// Interfaces
import { CoreNavigationFolder, CoreNavigationItem } from './core-navigation.interfaces';
// Kendo UI
import { SVGIcon, SVGIconModule } from '@progress/kendo-angular-icons';
import { TooltipModule } from '@progress/kendo-angular-tooltip';
import { chevronDownIcon, chevronUpIcon } from '@progress/kendo-svg-icons';
// Core UI
import { CoreIcon } from '../core-icon';

@Component({
  selector: 'core-navigation',
  templateUrl: './core-navigation.component.html',
  styleUrl: './core-navigation.component.scss',
  host: {
    '(window:resize)': 'onResize($event)',
  },
  imports: [RouterOutlet, SVGIconModule, TooltipModule, NgStyle, NgClass],
})
export class CoreNavigationComponent implements OnInit {
  // [ Public API ]

  public items = input.required<(CoreNavigationItem | CoreNavigationFolder)[]>();
  public width = input<string>('250px');
  public mode = input<'push' | 'overlay'>('push');
  public miniMode = input<boolean>(true);
  public expanded = model<boolean>(true);
  public showViewLabels = input<boolean>(true);
  public viewLabelChange = output<string>();

  // [ Internal ]

  // Dependencies

  private _router = inject(Router);
  private _activatedRoute = inject(ActivatedRoute);

  // Internal properties
  public _internalMode = computed<'push' | 'overlay'>(() =>
    this.mode() === 'push' && this._windowInnerWidth() > 768 ? 'push' : 'overlay',
  );
  public _showOverlay = computed(() => this.expanded() && this._internalMode() === 'overlay');
  public _selectedItemId?: number | string;
  public _expandedItems: (number | string)[] = [];
  public _chevronUpIcon = chevronUpIcon;
  public _chevronDownIcon = chevronDownIcon;
  public _viewLabel = signal<string>('');
  private _windowInnerWidth = signal<number>(window.innerWidth);

  // Listen to window resize
  public onResize(event: Event): void {
    this._windowInnerWidth.set((event.target as Window).innerWidth);
  }

  public $asSVGIcon(icon: CoreIcon): SVGIcon {
    return icon;
  }

  public ngOnInit(): void {
    // Initialize state of navigation (selection, expanded folder)
    this.initializeStateBasedOnUrl();
    // Check if only 1 item has been specified to align at the bottom
    let numberOfItemsToBeAlignedBottom = 0;
    for (const item of this.items()) {
      if (item.alignBottom) {
        numberOfItemsToBeAlignedBottom++;
      }
    }
    if (numberOfItemsToBeAlignedBottom > 1) {
      // Notify user to specify only the first item to be aligned at the bottom
      throw new Error('Only one item can be aligned at the bottom');
    }
  }

  // [ Events ]

  public async _onSelect(item: CoreNavigationItem | CoreNavigationFolder): Promise<void> {
    // If selected item is a folder, expand it or collapse it then do nothing
    if ('children' in item) {
      // If it is already expanded, then collapse it
      if (this._expandedItems.includes(item.id)) {
        this._expandedItems = this._expandedItems.filter((id) => id !== item.id);
      }
      // Otherwise, expand it
      else {
        this._expandedItems.push(item.id);
      }
      return;
    }

    // Check if item is not already selected
    if (item.id !== this._selectedItemId) {
      // Navigate to the new selected item route
      const success = await this._router.navigate([item.route], {
        relativeTo: this._activatedRoute,
      });
      if (success) {
        this._selectById(item.id);
        this._updateViewLabel();
      }
      // Additionally check if navigation must be collapsed
      if (this._internalMode() === 'overlay') {
        this.expanded.set(false);
      }
    }
  }

  public _itemIsExpanded(itemId: number | string): boolean {
    return this._expandedItems.includes(itemId);
  }

  public _hasChildSelected(folder: CoreNavigationFolder): boolean {
    if (!this._selectedItemId) return false;
    return folder.children.map((c) => c.id).includes(this._selectedItemId);
  }

  public onOverlayClick(): void {
    this.expanded.set(false);
  }

  // [ Internal Functions ]

  private _expandById(itemId: number | string): void {
    this._expandedItems.push(itemId);
  }

  private _selectById(itemId: number | string): void {
    this._selectedItemId = itemId;
  }

  private _updateViewLabel(): void {
    // Check if present in first level items
    const selectedItem = this.items().find((item) => item.id === this._selectedItemId);
    if (selectedItem) {
      this._viewLabel.set(selectedItem.label);
      this.viewLabelChange.emit(selectedItem.label);
      return;
    }
    // Check if present in second level items
    for (const item of this.items()) {
      if ('children' in item) {
        const child = item.children.find((c) => c.id === this._selectedItemId);
        if (child) {
          const label = item.label + ' / ' + child.label;
          this._viewLabel.set(label);
          this.viewLabelChange.emit(label);
          return;
        }
      }
    }
  }

  private initializeStateBasedOnUrl(): void {
    const currentRoute = this._activatedRoute.snapshot.children[0]?.routeConfig?.path ?? null;
    if (currentRoute == null) {
      void this._navigateToFirstItemView();
      return;
    }

    for (const item of this.items()) {
      if ('route' in item) {
        if (item.route === currentRoute) {
          this._selectById(item.id);
        }
      } else {
        for (const child of item.children) {
          if (child.route === currentRoute) {
            this._expandById(item.id);
            this._selectById(child.id);
          }
        }
      }
    }
    this._updateViewLabel();
  }

  private async _navigateToFirstItemView(): Promise<void> {
    const firstItem = this.items()[0];
    if ('route' in firstItem) {
      await this._router.navigate([firstItem.route], { relativeTo: this._activatedRoute });
      this._selectById(firstItem.id);
    } else {
      const firstChild = firstItem.children[0];
      await this._router.navigate([firstChild.route], { relativeTo: this._activatedRoute });
      this._expandById(firstItem.id);
      this._selectById(firstChild.id);
    }
    this._updateViewLabel();
  }
}
