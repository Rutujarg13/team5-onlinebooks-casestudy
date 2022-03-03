import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{
  authService:AuthService;
  router:Router;
  constructor(authService:AuthService, router:Router) { 
    this.authService = authService;
    this.router = router;
  }

  canActivate(){
    if(this.authService.getCurrentUser()){
      return true;
    }
    else{
      this.router.navigate(['/login']);
      return false;
    }
  }
}
