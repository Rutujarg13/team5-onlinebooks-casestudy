import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from "@auth0/angular-jwt";


@Injectable()
export class AuthService {
  http: HttpClient;
  activatedRoute:ActivatedRoute;
  router: Router;
  helper:JwtHelperService = new JwtHelperService();
  constructor(http:HttpClient, activatedRoute:ActivatedRoute, router: Router) {
    this.http = http;
    this.activatedRoute=activatedRoute;
    this.router = router;
   }
   public validateUser(mail:string,pass:string){
     let user = {email:mail, password:pass};
     return this.http.post("http://localhost:3000/api/auth/login", user);
   }

   public getCurrentUser(){
     let token = localStorage.getItem('token');
     if (!token) return null;
     return this.helper.decodeToken(token);
   }

   public adminSignOut(){
     localStorage.removeItem('token');
    this.router.navigate(['/login']);
   }
}
