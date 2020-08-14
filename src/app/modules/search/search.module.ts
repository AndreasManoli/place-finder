import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AutoCompleteModule } from '../auto-complete/auto-complete.module';
import { RangeSelectorModule } from '../range-selector/range-selector.module';
import { TypeSelectorModule } from '../type-selector/type-selector.module';
import { SearchWrapperComponent } from './component/search-wrapper/search-wrapper.component';
import { SearchService } from './services/search.service';

const components = [SearchWrapperComponent];

@NgModule({
  declarations: components,
  entryComponents: components,
  imports: [CommonModule, AutoCompleteModule, TypeSelectorModule, RangeSelectorModule],
  exports: components,
  providers: [SearchService]
})
export class SearchModule {}
