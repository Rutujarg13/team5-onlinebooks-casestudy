import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SyncRequestClient } from 'ts-sync-request';
import { Author } from '../modules/author';
import { Book } from '../modules/book';
import { Publisher } from '../modules/publisher';
import { Category } from '../modules/category';

@Injectable({
  providedIn: 'root'
})
export class PoductmanagementService {
  http: HttpClient;
  httpSync = new SyncRequestClient();

  constructor(http:HttpClient) { 
    this.http = http;
  }

  public getAllBooks(){
    return this.http.get<Book[]>("http://localhost:3000/api/admin/products");
  }

  public getBookAuthors(book:string){
    return this.http.get<Author[]>(`http://localhost:3000/api/admin/products/bookauthors/${book}`);
  }

  public getBooksAuthors(){
    return this.http.get("http://localhost:3000/api/admin/products/booksauthors/");
  }

  public getCategories(){
    return this.http.get<Category[]>("http://localhost:3000/api/admin/products/categories");
  }

  public getPublishers(){
    return this.http.get<Publisher[]>("http://localhost:3000/api/admin/products/publishers");
  }

  public getAuthors(){
    return this.http.get<Author[]>("http://localhost:3000/api/admin/products/authors");
  }

 public editBook(book_details:any){
   return this.http.put<Book>("http://localhost:3000/api/admin/products/edit", book_details);
 }

 public addBook(book_details:any){
   return this.http.post("http://localhost:3000/api/admin/products/add", book_details);
 }

 public addAuthor(author_details:any){
  return this.httpSync.post("http://localhost:3000/api/admin/products/add/author", author_details);
  }

 public addPublisher(publisher_details:any){
   return this.httpSync.post("http://localhost:3000/api/admin/products/add/publisher", publisher_details);
 }

 public addCategory(category_details: any){
   return this.httpSync.post("http://localhost:3000/api/admin/products/add/category", category_details);
 }

 public deleteBooksAuthor(book_author:any){
  return this.http.delete("http://localhost:3000/api/admin/products/deletebookauthor/", book_author);
 }

 public deleteBook(bookId:string){
   return this.http.delete(`http://localhost:3000/api/admin/products/delete/${bookId}`);
 }
  
}
