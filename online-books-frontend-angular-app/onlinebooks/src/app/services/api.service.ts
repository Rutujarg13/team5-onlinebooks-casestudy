import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  http:HttpClient;
   url:any="http://localhost:3000/api/products";
  constructor(http:HttpClient) { 
    console.log("Api services..");
    this.http=http;
  }

 /* public getProduct(){
    let x:Observable<any>;
    x=this.http.get(this.url);
    return x;
  }*/
  public getAllBooks(){

    return this.http.get("http://localhost:3000/api/products");

  }
  public getBookDetails(id:number){
    return this.http.get(`http://localhost:3000/api/products/book-detail/${id}`);
  }

  public getHighPrice(){
  return this.http.get("http://localhost:3000/api/products/price/desc");
  }

  public getLowPrice(){
    return this.http.get("http://localhost:3000/api/products/price/asc");
    }

  public getRatingHigh(){
      return this.http.get("http://localhost:3000/api/products/rating/desc");
    }

  public getCategories(){

    return this.http.get("http://localhost:3000/api/products/category");

  }


  public getBookByCategory(id:number){
    return this.http.get(`http://localhost:3000/api/products/category/${id}`);
    
  }

 

  
}
