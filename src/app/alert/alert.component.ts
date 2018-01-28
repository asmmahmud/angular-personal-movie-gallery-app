import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgRedux, select} from '@angular-redux/store';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import {AlertActions} from '../redux-store/alert/alert-actions';
import {IAppState} from '../redux-store/data-models/interfaces';

@Component({
  selector: 'app-alert',
  template: `
    <div class="row justify-content-center my-4" *ngIf="message$ | async">
      <div class="col col-md-8">
        <div [class]="alert_class" role="alert">
          <div class="alert-item"><strong>{{message$ | async}}</strong></div>
          <div class="alert-item"><i (click)="onCloseMessage()" class="fa fa-times">X</i></div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .alert-item {
      align-self: center;
    }
    .fa-times {
      cursor: pointer;
      display: inline-block;
      padding: 3px;
      border: 1px solid rgba(0, 0, 0, 0.2);
      border-radius: 5px;
    }
  `]
})
export class AlertComponent implements OnInit, OnDestroy {
  sub1: Subscription;
  alert_class: string;
  @select(['alert', 'message']) message$: Observable<string>;
  @select(['alert', 'messageType']) messageType$: Observable<string>;
  constructor(private ngRedux: NgRedux<IAppState>) {
  }
  ngOnInit() {
    this.sub1 = this.messageType$.subscribe(messageType => {
      this.alert_class = 'd-flex justify-content-between alert alert-' + messageType;
    });
  }
  ngOnDestroy() {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
  }
  onCloseMessage() {
    this.ngRedux.dispatch(AlertActions.closeAlert());
  }
}
