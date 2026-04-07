import { CoreButtonType, CoreButtonColor } from '../components/core-button';
import { _CoreButtonType, _CoreButtonColor } from '../components/core-button/core-button.types';

export class KendoTypeConverter {
  public static getKendoButtonType(coreType: CoreButtonType): _CoreButtonType {
    switch (coreType) {
      case 'outline':
        return 'outline';
      case 'flat':
        return 'flat';
      default:
        return 'solid';
    }
  }

  public static getKendoButtonColor(coreColor: CoreButtonColor): _CoreButtonColor {
    switch (coreColor) {
      case 'primary':
        return 'primary';
      case 'secondary':
        return 'secondary';
      case 'warning':
        return 'warning';
      case 'error':
        return 'error';
      default:
        return 'base';
    }
  }
}
