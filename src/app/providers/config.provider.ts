import { InjectionToken } from '@angular/core';
import { general, mapOptions, radius, urls } from '../config/config.json';
import { AppConfig } from '../interfaces/config.interface';

export const PLACE_FINDER_CONFIG: AppConfig = { general, urls, radius, mapOptions };
export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');
