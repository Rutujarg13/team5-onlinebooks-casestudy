import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { LoginComponent } from './components/login/login.component';
import { AuthService } from './services/auth.service';
import { PoductmanagementService } from './services/poductmanagement.service';
import { DiscountmanagementService } from './services/discountmanagement.service';
import { ProductmanagementComponent } from './components/productmanagement/productmanagement.component';
import { DiscountmanagementComponent } from './components/discountmanagement/discountmanagement.component';
import { SearchComponent } from './components/search/search.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AdminNavComponent } from './components/admin-nav/admin-nav.component';
import { AuthGuardService } from './services/auth-guard.service';
import { AdminAuthGuardService } from './services/admin-auth-guard.service';
import { BookDiscountComponent } from './components/book-discount/book-discount.component';
import { CategoryDiscountComponent } from './components/category-discount/category-discount.component';
import { DiscountHistoryComponent } from './components/discount-history/discount-history.component';
 import { RouterModule,Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductComponent } from './product/product.component';
import { ApiService } from './services/api.service';
import { HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { HighpriceComponent } from './sortby/highprice/highprice.component';
import { LowpriceComponent } from './sortby/lowprice/lowprice.component';
import { RatinghighComponent } from './sortby/ratinghigh/ratinghigh.component';
import { CategoryComponent } from './category/category.component';
import { CategorylistComponent } from './categorylist/categorylist.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

const routes:Routes= [
  {path: 'login', component: LoginComponent},
  {path: 'admin/products', component: ProductmanagementComponent, canActivate:[AuthGuardService, AdminAuthGuardService]},
  {path:'admin/discounts', component:DiscountmanagementComponent, canActivate:[AuthGuardService, AdminAuthGuardService]},
  {path: 'home' , component: ProductComponent},
  {path: 'product', component: ProductComponent},
  {path: 'product/:id', component: ProductDetailsComponent},
  {path: 'category/:id', component: CategorylistComponent},
  {path: 'sortby', component:ProductComponent},
  {path: 'sortby/highprice', component:HighpriceComponent},
  {path: 'sortby/lowprice', component:LowpriceComponent},
  {path: 'sortby/highrating', component:RatinghighComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProductmanagementComponent,
    DiscountmanagementComponent,
    SearchComponent,
    AdminNavComponent,
    BookDiscountComponent,
    CategoryDiscountComponent,
    DiscountHistoryComponent,
    ProductComponent,
    HomeComponent,
    ProductDetailsComponent,
    HighpriceComponent,
    LowpriceComponent,
    RatinghighComponent,
    CategoryComponent,
    CategorylistComponent,
    FooterComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NoopAnimationsModule,
    MatAutocompleteModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    RouterModule.forRoot(routes)
  ],
  providers: [ApiService, AuthService, PoductmanagementService, DiscountmanagementService, AuthGuardService, AdminAuthGuardService],

  bootstrap: [AppComponent]
})
export class AppModule { }
