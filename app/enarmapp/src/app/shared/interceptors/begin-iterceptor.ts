import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpResponse, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Injectable()
export class HeaderBeginInterceptor implements HttpInterceptor {
  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('begin');
    httpRequest.headers.append("Access-Control-Allow-Origin", "*")
    httpRequest.headers.append("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    let modifiedReq = httpRequest.clone({ 
        headers: httpRequest.headers.set('Access-Control-Allow-Origin', `*`),
      });
      modifiedReq = modifiedReq.clone({ 
        headers: modifiedReq.headers.set('Access-Control-Allow-Headers', `Origin, X-Requested-With, Content-Type, Accept`),
      });

      modifiedReq = modifiedReq.clone({ 
        headers: modifiedReq.headers.set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT'),
      });
    
    return next.handle(modifiedReq);
  }
}