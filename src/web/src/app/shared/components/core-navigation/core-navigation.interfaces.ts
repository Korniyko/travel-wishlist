import { CoreIcon } from '../core-icon';

export interface CoreNavigationItem {
  id: number | string;
  label: string;
  route: string;
  icon?: CoreIcon;
  alignBottom?: boolean;
}

export interface CoreNavigationFolder {
  id: number | string;
  label: string;
  children: CoreNavigationItemChild[];
  icon?: CoreIcon;
  alignBottom?: boolean;
}

export interface CoreNavigationItemChild {
  id: number | string;
  label: string;
  route: string;
  icon?: CoreIcon;
}
