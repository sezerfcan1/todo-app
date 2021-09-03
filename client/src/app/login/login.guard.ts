import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { Auth } from "../models/auth/auth.model";



@Injectable()

export class LoginGuard implements CanActivate{

    constructor(private auth:Auth, private router:Router){

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        let logged = this.auth.success;
        if (logged) {
            return true;
        }
        
        this.router.navigate(["login"]);
        return false;
    }

}