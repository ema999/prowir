import { EventEmitter, Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../../../environments/environment';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService
{

    constructor(private http: Http)
    {

    }

    login(credentials, callback)
    {
      this.http.post(environment.baseUrl + '/api/user/login', credentials)
      .map(res => res.json())
      .subscribe(
        data => {
          if(data.token) {
            localStorage.setItem('token', data.token);
            callback(null, data);
          }
        },
        error => {
          callback(JSON.parse(error._body), null);
          console.log(error);
        }
      );
    }

    logout(): void {
      localStorage.removeItem('token');
    }

    loggedIn() {
      return tokenNotExpired();
    }

}
