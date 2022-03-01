import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../_models/user';
import { AlertifyService } from '../_services/alertify.service';
import { UserService } from '../_services/user.service';

@Injectable()

export class MemberListResolver implements Resolve<User[]> {
    pageNumber = 1;
    pageSize = 5;

    constructor(private userService: UserService, private router: Router,
         private alertify: AlertifyService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<User[]> {
        return this.userService.getUsers(this.pageNumber, this.pageSize).pipe(
            catchError(error => {
                this.alertify.error('Error retrieving data!');
                this.router.navigate(['/home']);
                return of(null);
            })
        );
    }
}
