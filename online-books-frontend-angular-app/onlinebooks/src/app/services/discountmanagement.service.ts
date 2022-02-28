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

   public addDiscount(book_id:number, discount:number){
    
     let new_discount:any = {"book_id": book_id, "discount": discount};
     return this.http.post("http://localhost:3000/api/admin/discounts/add/", new_discount);
   }

   public deleteDiscount(book_id:number){
     return this.http.delete(`http://localhost:3000/api/admin/discounts/delete/${book_id}`);
   }

   public editDiscount(book_id:number, discount:number){
     let edited_discount= {book_id, discount};
     return this.http.put("http://localhost:3000/api/admin/discounts/edit", edited_discount);
   }
}
