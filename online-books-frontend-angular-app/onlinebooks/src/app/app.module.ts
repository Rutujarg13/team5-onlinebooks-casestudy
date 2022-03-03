import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes  } from '@angular/router';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { AuthService } from './services/auth.service';
import { PoductmanagementService } from './services/poductmanagement.service';
import { DiscountmanagementService } from './services/discountmanagement.service';
import { ProductmanagementComponent } from './components/productmanagement/productmanagement.component';
import { DiscountmanagementComponent } from './components/discountmanagement/discountmanagement.component';
import { AdminComponent } from './components/admin/admin.component';
import { SearchComponent } from './components/search/search.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AdminNavComponent } from './components/admin-nav/admin-nav.component';
import { AuthGuardService } from './services/auth-guard.service';
import { AdminAuthGuardService } from './services/admin-auth-guard.service';
 

const routes:Routes= [
  {path: 'login', component: LoginComponent},
  {path: 'admin/products', component: ProductmanagementComponent, canActivate:[AuthGuardService, AdminAuthGuardService]},
  {path:'admin/discounts', component:DiscountmanagementComponent, canActivate:[AuthGuardService, AdminAuthGuardService]}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProductmanagementComponent,
    DiscountmanagementComponent,
    AdminComponent,
    SearchComponent,
    AdminNavComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NoopAnimationsModule,
    MatAutocompleteModule,
    RouterModule.forRoot(routes)
  ],
  providers: [AuthService, PoductmanagementService, DiscountmanagementService, AuthGuardService, AdminAuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
