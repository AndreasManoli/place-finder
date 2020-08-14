import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from '../interfaces/config.interface';
import { APP_CONFIG } from '../providers/config.provider';

@Injectable()
export class ApiKeyParamInterceptor implements HttpInterceptor {
  constructor(@Inject(APP_CONFIG) private config: AppConfig) {}

  intercept = (request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> => {
    const symbol = request.url.includes('?') ? '&' : '?';
    return next.handle(request.clone({ url: `${request.url}${symbol}key=${this.config.general.apiKey}` }));
  };
}
