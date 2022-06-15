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
            alert('Você não tem permissão para ver esta pagina! Favor faça login ou cadastre-se.');

            this.router.navigate(["login"],{ queryParams: { retUrl: route.url} });
            return false;

        }

        return true;
    }

}
