import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AjaxLoaderComponent} from '../layout/ajax-loader/ajax-loader.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    AjaxLoaderComponent
  ],
  exports: [
    AjaxLoaderComponent
  ]

})
export class SharedModule {
}
