import * as allActions from '../all-actions';

export class AlertActions {

  static showAlert(message: string, messageType: string) {
    return ({
      type: allActions.SHOW_ALERT,
      payload: {message, messageType}
    });
  }
  static closeAlert() {
    return {
      type: allActions.CLOSE_ALERT,
    };
  }
}
