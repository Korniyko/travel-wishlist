export class ErrorResponse {
  public type: 'error' | 'warning';
  public message: string;
  public errorCode?: string;

  constructor(message: string, type: 'error' | 'warning' = 'error', errorCode?: string) {
    this.message = message;
    this.type = type;
    if (errorCode) {
      this.errorCode = errorCode;
    }
  }
}
