import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Subject } from 'rxjs/Subject';
import { AuthHttp } from 'angular2-jwt';
import { UserModel } from '../models/user.model';

@Injectable()
export class UserService
{
    // Current Account
    private currentAccountSource = new Subject<any>();
    currentAccount$ = this.currentAccountSource.asObservable();

    constructor(private authHttp: AuthHttp)
    {

    }

    getCurrentAccount() {
      this.authHttp.get(environment.baseUrl + '/api/user/current')
        .subscribe(
          data => {
            let user = new UserModel(data.json());
            this.currentAccountSource.next(user);
          },
          err => console.log(err)
        );
      return this.currentAccount$;
    }
    getCurrentAccountObservable() { return this.currentAccount$; }

    getAccount(id , callback) {
      this.authHttp.get(environment.baseUrl + '/api/user/'+ id)
        .subscribe(
          data => {
            let user = new UserModel(data.json());
            return callback(null, user);
          },
          err => callback(err)
        );
    }

}
