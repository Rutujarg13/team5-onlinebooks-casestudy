import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
authService : AuthService;
email:string='';
password:string='';
errorMsg:string='';

  constructor(service:AuthService) { 
    this.authService = service;
  }

  ngOnInit(): void {
    
  }

  validate(){
    this.authService.validateUser(this.email,this.password)
    .subscribe((response :any)=>{
      if(response.status=='error'){
        this.errorMsg='Invalid Credentials';
      }
      else{
        this.errorMsg='';
      }
      console.log(response);
    }, (error)=>{
      console.log(error);
      
    });
  }
}