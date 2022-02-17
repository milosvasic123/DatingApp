import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private alertify: AlertifyService, private router: Router) {}
  canActivate(): boolean {
    if (this.authService.loggedIn()) {
      return true;
    }

    this.alertify.error('You dont have access!!!');
    this.router.navigate(['/home']);
    return false;
  }
}
