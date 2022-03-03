import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
authService : AuthService;
  constructor(service:AuthService) { 
    this.authService = service;
  }

  ngOnInit(): void {
    this.authService.validateUser("jack@example.com","pass12356")
    .subscribe((response)=>{
      console.log(response);
    }, (error)=>{
      console.log(error);
    })
  }

}
