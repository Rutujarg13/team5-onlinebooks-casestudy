import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  http: HttpClient;
  constructor(http:HttpClient) {
    this.http = http;
   }

   public validateUser(mail:string,pass:string){
     let user = {email:mail, password:pass};
     return this.http.post("http://localhost:3000/api/auth/login", user);
   }
}
