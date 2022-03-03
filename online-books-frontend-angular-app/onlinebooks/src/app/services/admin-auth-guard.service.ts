import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate{
  authService:AuthService;
  router:Router;
  constructor(authService:AuthService, router:Router) { 
    this.authService = authService;
    this.router = router;
  }

  canActivate(){
    let user = this.authService.getCurrentUser();
    if(user.admin==true){
      return true;
    }
    else{
      this.router.navigate(['/']);
      return false;
    }
  }
}
 
