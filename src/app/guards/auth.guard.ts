import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor(
    private router: Router
  ) {}

  canLoad() {
    const isAuthenticated = !!(+localStorage.getItem('authenticated'));

    if (isAuthenticated) {
      return true;
    } else {
      this.router.navigateByUrl(
        this.router.createUrlTree(
          ['login'], { queryParams:  { redirectTo: this.getRedirectUrl() } }
        )
      );
      return false;
    }
  }

  getRedirectUrl() {
    let url = '/';
    const navigation = this.router.getCurrentNavigation();

    if (navigation) {
      url = navigation.extractedUrl.toString();
    }

    return url;
  }
}
