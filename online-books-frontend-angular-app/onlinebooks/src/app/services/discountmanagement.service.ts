import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DiscountmanagementService {
  http: HttpClient;

  constructor(http:HttpClient) {
    this.http = http;
   }

   public getDiscounts(){
     return this.http.get("http://localhost:3000/api/admin/discounts/");
   }

   public addDiscount(newDiscount:any){
     return this.http.post("http://localhost:3000/api/admin/discounts/add/", newDiscount);
   }


}
