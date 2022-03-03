import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.css']
})
export class AdminNavComponent implements OnInit {
  authService:AuthService;
  constructor(authService:AuthService) {
    this.authService = authService;
   }

  ngOnInit(): void {
  }

}
