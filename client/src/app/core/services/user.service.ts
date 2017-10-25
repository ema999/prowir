import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Subject } from 'rxjs/Subject';
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class UserService
{

    private currentAccountSource = new Subject<any>();
    currentAccount$ = this.currentAccountSource.asObservable();

    constructor(private authHttp: AuthHttp)
    {

    }

    getCurrentAccount() {
      this.authHttp.get(environment.baseUrl + '/api/user/current')
        .subscribe(
          data => this.currentAccountSource.next(data),
          err => console.log(err)
        );
      return this.currentAccount$;
    }

}
