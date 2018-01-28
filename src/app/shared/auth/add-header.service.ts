import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AddHeaderInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const headers = {
      setHeaders: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    };
    /*    if (AuthService.getToken()) {
          headers.setHeaders['Authorization'] = 'Bearer ' + AuthService.getToken();
        }*/
    req = req.clone(headers);
    return next.handle(req);
  }
}

