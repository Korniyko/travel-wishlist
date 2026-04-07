// Angular
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { lastValueFrom } from 'rxjs';
// Classes
import { ErrorResponse } from '../classes/ErrorResponse';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private _httpClient = inject(HttpClient);

  public async get<T>(url: string): Promise<T | ErrorResponse> {
    try {
      const response = await lastValueFrom(this._httpClient.get<T>(url));
      return response;
    } catch (err: any) {
      return this.getErrorResponse(err);
    }
  }

  public async download(method: 'GET' | 'POST', url: string, body?: any): Promise<boolean> {
    try {
      const response = await lastValueFrom(
        this._httpClient.request(method, url, {
          body,
          observe: 'response',
          responseType: 'arraybuffer',
          headers: { 'Content-Type': 'application/json' },
        }),
      );
      const contentType = response.headers.get('Content-Type') ?? 'application/octet-stream';
      const disposition = response.headers.get('Content-Disposition');
      let filename = 'download';
      if (disposition) {
        const match = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/.exec(disposition);
        if (match && match[1]) {
          filename = decodeURIComponent(match[1].replace(/['"]/g, ''));
        }
      }
      const file = new Blob([response.body as any], { type: contentType });
      // saveAs(file, filename);
      return true;
    } catch (err: any) {
      this.getErrorResponse(err);
      return false;
    }
  }

  // [ Internal ]

  private getErrorResponse(error: HttpErrorResponse): ErrorResponse {
    let errorMessage = 'System Error';
    let errorCode = null;
    if (
      error.error != null &&
      error.error.errors != null &&
      (error.error.errors as any[]).length > 0
    ) {
      errorMessage = error.error.errors[0].message;
      errorCode = error.error.errors[0].extensions.code;
    } else if (error.error != null && typeof error.error.message === 'string') {
      errorMessage = error.error.message;
    } else if (error.error instanceof ArrayBuffer) {
      const rawMessage: { message: string } = JSON.parse(new TextDecoder().decode(error.error));
      if (rawMessage?.message != null) {
        errorMessage = rawMessage.message;
      }
    } else if (typeof error.message === 'string') {
      errorMessage = error.message;
    }

    return new ErrorResponse(errorMessage, 'error', errorCode);
  }
}
