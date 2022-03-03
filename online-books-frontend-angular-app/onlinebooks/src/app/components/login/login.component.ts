import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
authService : AuthService;
activatedRoute:ActivatedRoute;
router: Router;
email:string='';
password:string='';
errorMsg:string=''; 


  constructor(service:AuthService, activatedRoute:ActivatedRoute, router:Router) { 
    this.authService = service;
    this.activatedRoute=activatedRoute;
    this.router = router;
  }

  ngOnInit(): void {
    
  }

  validate(){
    this.authService.validateUser(this.email,this.password)
    .subscribe((response :any)=>{
      if(response.status=='error'){
        this.errorMsg='Invalid Credentials';
        return false;
      }
      else{
        this.errorMsg='';
        localStorage.setItem('token', response.data);
        let user = this.authService.getCurrentUser();
        if(user.admin==true){
          this.router.navigate(['/admin/products']);
        }
        else{
          this.router.navigate(['/']);
        }
        return true;
      }
    }, (error)=>{
      return false;
    });
  }
}