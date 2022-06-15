import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot,RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';



@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(private router:Router, private authService: AuthService ) {

    }

    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): boolean|UrlTree {

        if (!this.authService.isUserLoggedIn()) {
            alert('Você não tem permissão de ver esta pagina! Favor fazer login.');

            this.router.navigate(["login"],{ queryParams: { retUrl: route.url} });
            return false;

        }

        return true;
    }

}
