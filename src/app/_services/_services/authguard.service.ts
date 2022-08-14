import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
const USER_KEY = 'auth-user';
@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate() {
        if (window.sessionStorage.getItem(USER_KEY)) {
            return true;
        }
        else
        {
          this.router.navigate(['/login']);
          return false;
        }
    }
}