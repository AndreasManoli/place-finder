import { InjectionToken } from '@angular/core';
import { general, mapOptions, radius, types, urls } from '../config/config.json';
import { AppConfig } from '../interfaces/config.interface';

export const PLACE_FINDER_CONFIG: AppConfig = { general, urls, radius, mapOptions, types };
export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');
