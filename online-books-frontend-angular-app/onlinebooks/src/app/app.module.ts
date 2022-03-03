import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule,Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductComponent } from './product/product.component';
import { ApiService } from './services/api.service';
import { HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { HomeComponent } from './home/home.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { HighpriceComponent } from './sortby/highprice/highprice.component';
import { LowpriceComponent } from './sortby/lowprice/lowprice.component';
import { RatinghighComponent } from './sortby/ratinghigh/ratinghigh.component';
import { CategoryComponent } from './category/category.component';
import { CategorylistComponent } from './categorylist/categorylist.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';



const routes:Routes = [
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
    ProductComponent,
    HomeComponent,
    ProductDetailsComponent,
    HighpriceComponent,
    LowpriceComponent,
    RatinghighComponent,
    CategoryComponent,
    CategorylistComponent,
    FooterComponent,
    NavbarComponent,
  ],
  imports: [
  
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    RouterModule.forRoot(routes) 
  
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
