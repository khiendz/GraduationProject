import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../environments/environment';
import { AuthenticationService } from '../app/shared/services/authentication.service';
import { User } from '../app/shared/models/User';

export const rootApi = `${environment.apiUrl}`;
@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if user is logged in and request is to the api url
        const currentUser = this.authenticationService.currentUserValue;
        const isLoggedIn = currentUser && currentUser.token;
        const isApiUrl = request.url.startsWith(environment.apiUrl);

        if (isLoggedIn && isApiUrl) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentUser.token}`
                },
                url: `${rootApi}${request.url}`
            });
        }else
        {
          const token = localStorage.getItem('currentUser')
          ? JSON.parse(localStorage.getItem('currentUser') || '')
          : [];
          request = request.clone({
            setHeaders: {
              Authorization: `Bearer ${token.token}`
          },
            url: `${rootApi}${request.url}`
        });
        }


        return next.handle(request);
    }
}
