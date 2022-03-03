import { Component, OnInit } from '@angular/core';
import { PoductmanagementService } from 'src/app/services/poductmanagement.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-productmanagement',
  templateUrl: './productmanagement.component.html',
  styleUrls: ['./productmanagement.component.css']
})
export class ProductmanagementComponent implements OnInit {
  productManagementService: PoductmanagementService;
  bookList:any[]=[];
  publishers:any[]=[];
  authors:any[]=[];
  booksAuthors:any[]=[];
  categories:any[]=[];
  filter:string='';
  bookAuthors:any[]=[];
  authorsIds:any[]=[];

  constructor(service: PoductmanagementService) {
    this.productManagementService = service;
   }

  ngOnInit(): void {
    this.getAllBooks();
    this.getBooksAuthors();
    this.getCategories();
    this.getPublishers();
    this.getAuthors();
}

getAllBooks(){
  this.productManagementService.getAllBooks()
    .subscribe((response:any)=>{
      this.bookList = response;
    }
    );
}

getBooksAuthors(){
  this.productManagementService.getBooksAuthors()
  .subscribe((response:any)=>{
    this.booksAuthors = response;
  });

}

getCategories(){
  this.productManagementService.getCategories()
    .subscribe((response:any)=>{
      this.categories = response;
    });
}

getAuthors(){
  this.productManagementService.getAuthors()
    .subscribe((response:any)=>{
      this.authors = response;
    });
}

getPublishers(){
  this.productManagementService.getPublishers()
    .subscribe((response:any)=>{
      this.publishers = response;
    });
}

getAuthorsOfTheBook(bookId:any){
  this.productManagementService.getBookAuthors(bookId)
  .subscribe((response:any)=>{
    this.bookAuthors = response;
  });
}

deleteBooksAuthor(bookId:number, authorId:number){
  let bookAuthor = {"book_id":bookId, "author_id":authorId};
  this.productManagementService.deleteBooksAuthor(bookAuthor)
  .subscribe((response:any)=>{
  });
}

deleteBook(bookId:any){
  this.productManagementService.deleteBook(bookId)
  .subscribe((response:any)=>{
    this.getAllBooks();
  });
}

editBook(book:any){
  this.productManagementService.editBook(book)
  .subscribe((response:any)=>{
    this.getAllBooks();
  });
}

// add book
addBook(book:any){
    this.productManagementService.addBook(book)
    .subscribe((response:any)=>{
      this.getAllBooks();
        this.getAuthors();
        this.getPublishers();
        this.getCategories();
        this.getBooksAuthors();
    });
  }

//add author
addAuthor(firstName:string, lastName:string){
  let author = {
    "first_name":firstName,
    "last_name":lastName
  }
  let response = this.productManagementService.addAuthor(author);
    return(response);
}
  
  //add publisher
  addPublisher(publisherName:string){
    let publisher={ "publisher_name":publisherName};
   let response = this.productManagementService.addPublisher(publisher);
    return(response);
  }
  
  
  //add category
  addCategory(categoryName:string){
    let category={ "category_name":categoryName};
    let response= this.productManagementService.addCategory(category);
    return response;
  }


newBook(form:any){
  let title:string = form.value.newTitle;
  let authorsInput = form.value.author;
  let authors = authorsInput.split(',');
  authors.forEach((author:string)=>{
    this.getAuthorId(author);
  });
  let categoryId = this.getCategoryId(form.value.selectedCategory);
  let publisherId = this.getPublisherId(form.value.selectedPublisher);
  let price = form.value.price;
  let quantity = form.value.quantity;
  let description = form.value.description;
  let cover = form.value.cover;
  let book ={      
        "title":title,
          "publisher_id": publisherId,
          "price": price,
          "quantity": quantity,
          "description":description,
          "category_id":categoryId,
          "cover":cover,
          "authors":[this.authorsIds]
        };
        this.addBook(book);
        form.resetForm();
}

getAuthorId(authorName:string){
  let name = authorName.split(" ");
  let firstName = name[0];
  let lastName = name[name.length-1];
  let idFound = false;
  let authorId:any=-1;
  this.authors.forEach((a)=>{
    if(a.first_name==firstName && a.last_name== lastName){
      authorId=a.author_id;
    }
  })
  if(authorId==-1){
    authorId=this.addAuthor(firstName, lastName);
  }
    this.authorsIds.push(authorId);
}

getPublisherId(publisherName:string){
  let publisherId:any=-1;
  this.publishers.forEach((p)=>{
    if(p.publisher_name==publisherName){
      publisherId=p.publisher_id;
    }
  })
  if(publisherId==-1){
    publisherId=this.addPublisher(publisherName);
  }
  return publisherId;
}

getCategoryId(selectedCategory:string){
  let categoryId:any = -1;
  this.categories.forEach((c)=>{
    if(c.category_name==selectedCategory){
      categoryId=c.category_id;
    }
  })
  if(categoryId==-1){
    categoryId = this.addCategory(selectedCategory);
  }
  return categoryId;
}


transformFilter(e:any){
  this.filter=e.target.value.toLowerCase();
}

}