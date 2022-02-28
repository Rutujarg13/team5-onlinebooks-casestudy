import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PoductmanagementService {
  http: HttpClient;

  constructor(http:HttpClient) { 
    this.http = http;
  }

  public getAllBooks(){
    return this.http.get("http://localhost:3000/api/admin/products");
  }

  public getBookAuthors(book:string){
    return this.http.get(`http://localhost:3000/api/admin/products/bookauthors/${book}`);
  }

  public getBooksAuthors(){
    return this.http.get("http://localhost:3000/api/admin/products/booksauthors/");
  }

  public getCategories(){
    return this.http.get("http://localhost:3000/api/admin/products/categories");
  }

  
}
