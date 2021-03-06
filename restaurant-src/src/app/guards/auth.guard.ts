import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../service/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  redirectUrl;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }
  canActivate(
    router: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    if (this.authService.loggedIn()) {
      return true;
    } else {
      this.redirectUrl = state.url;
      this.router.navigate(['/sigin']);
      return false;
    }
  }
}
