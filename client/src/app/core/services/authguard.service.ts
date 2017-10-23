import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate
{

    constructor(private auth: AuthService, private router: Router) {}

    canActivate() {
      if(this.auth.loggedIn()) {
        return true;
      } else {
        this.router.navigateByUrl('unauthorized');
        return false;
      }
    }

    resolve() {
      if(this.auth.loggedIn()) {
        this.router.navigateByUrl('');
      }
    }

}
