import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppComponent } from './app.component';
import { ApiKeyParamInterceptor } from './interceptors/api-key-param.interceptors';
import { GoogleMapModule } from './modules/google-map/google-map.module';
import { SearchModule } from './modules/search/search.module';
import { APP_CONFIG, PLACE_FINDER_CONFIG } from './providers/config.provider';
import { SearchWrapperComponent } from './search-wrapper/search-wrapper.component';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
  declarations: [AppComponent, SearchWrapperComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SearchModule,
    GoogleMapModule,
    MatSidenavModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en-US',
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    { provide: APP_CONFIG, useValue: PLACE_FINDER_CONFIG },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiKeyParamInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
