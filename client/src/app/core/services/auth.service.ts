import { EventEmitter, Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class AuthService
{

    constructor(private http: Http)
    {

    }

    login(credentials)
    {
      this.http.post(environment.baseUrl + '/api/user/login', credentials)
      .map(res => res.json())
      .subscribe(
        data => {
          if(data.token) localStorage.setItem('token', data.token)
        },
        error => console.log(error)
      );
    }

}
