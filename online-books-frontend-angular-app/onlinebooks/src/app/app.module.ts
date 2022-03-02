import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule } from "@angular/forms";
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
import { DiscountListComponent } from './components/discount-list/discount-list.component';
 
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProductmanagementComponent,
    DiscountmanagementComponent,
    AdminComponent,
    SearchComponent,
    DiscountListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NoopAnimationsModule,
    MatAutocompleteModule
  ],
  providers: [AuthService, PoductmanagementService, DiscountmanagementService],
  bootstrap: [AppComponent]
})
export class AppModule { }
