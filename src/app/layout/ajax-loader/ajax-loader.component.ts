import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-ajax-loader',
  template: `
    <div class="row justify-content-center ajax-loader-block">
      <div class="col-sm-auto">
        <img src="assets/ajax_loader_gray_128.gif"
             alt="ajax request is going on ..."
             class="ajax-loader-img"
             [ngStyle]="{width: width}"
        />
      </div>
    </div>
  `,
  styles: [`
    .ajax-loader-block {
      margin-top: 5rem;
    }
    img.ajax-loader-img {
      display: inline-block;
    }
  `]
})
export class AjaxLoaderComponent {
  @Input() width: string;
}
