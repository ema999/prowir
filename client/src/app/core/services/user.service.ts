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

    // List of users
    private userListSource = new Subject<any>();
    userList$ = this.userListSource.asObservable();
    private userListTotalSource = new Subject<any>();
    userListTotal$ = this.userListTotalSource.asObservable();

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

    getAccount(id, callback) {
      this.authHttp.get(environment.baseUrl + '/api/user/'+ id)
        .subscribe(
          data => {
            let user = new UserModel(data.json());
            return callback(null, user);
          },
          err => callback(err)
        );
    }

    getUserList(options, callback) {
      this.authHttp.post(environment.baseUrl + '/api/user/search', options)
        .subscribe(
          data => {
            let dataParsed = data.json();
            let users = dataParsed.users.map((user)=> new UserModel(user) );
            this.userListSource.next(users);
            this.userListTotalSource.next(dataParsed.aboutTotal);
            return callback();
          },
          err => console.log(err)
        );
    }

    deleteUsers(users, usersToRemove, callback) {
      let usersParsed = usersToRemove.map(u => {return {id: u.id} });

      this.authHttp.post(environment.baseUrl + '/api/user/delete', usersToRemove)
        .subscribe(
          data => {
            let dataParsed = data.json();

            let usersUp = users.filter(u => {
              return !usersParsed.find(up => up.id == u.id)
            }).map(u => {
              delete u.$$index;
              return u;
            });

            this.userListSource.next(usersUp);
            this.userListTotalSource.next(dataParsed.total);
            return callback(null, dataParsed);
          },
          err => callback(err)
        );
    }

    editUser(user, callback) {

      this.authHttp.put(environment.baseUrl + '/api/user/'+ user.id, user)
        .subscribe(
          data => {
            let dataParsed = data.json();
            return callback(null, dataParsed);
          },
          err => callback(err)
        );
    }

}
