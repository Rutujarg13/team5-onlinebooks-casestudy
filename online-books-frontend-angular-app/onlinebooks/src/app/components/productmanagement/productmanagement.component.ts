import { Component, OnInit } from '@angular/core';
import { PoductmanagementService } from 'src/app/services/poductmanagement.service';
import { HttpClient } from '@angular/common/http';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-productmanagement',
  templateUrl: './productmanagement.component.html',
  styleUrls: ['./productmanagement.component.css']
})
export class ProductmanagementComponent implements OnInit {
  http: HttpClient;
  productManagementService: PoductmanagementService;
  bookList:any[]=[];
  publishers:any[]=[];
  authors:any[]=[];
  booksAuthors:any[]=[];
  categories:any[]=[];
  filter:string='';
  bookId:any;
  bookAuthors:any[]=[];
  selectedCategory:any;
  selectedAuthor:any;
  selectedPublisher:any;
  price:any;
  quantity:any;
  img:any;
  cover:any;
  selectedCategoryId:any;
  selectedAuthorId:any;
  selectedPublisherId:any;
  newTitle:string='';
  selectedAuthorFirstName:string='';
  selectedAuthorLastName:string='';
  description:string='';

  constructor(service: PoductmanagementService, http:HttpClient) {
    this.productManagementService = service;
    this.http = http;
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
      // this.bookList.forEach((book)=>{
        // book.cover_img = book.cover_img.data.toString();
      // });
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

// addBook(){
//   let book ={      
//     "title":"Hobbit",
//       "publisher_id": 1,
//       "price":7.99,
//       "quantity":80,
//       "description":"Hobbit Book Description",
//       "category_id":1,
//       "cover":this.cover,
//       "cover_img":this.img,
//       "authors":[1]
//     };
//     this.productManagementService.addBook(book)
//     .subscribe((response:any)=>{
//       console.log("Book Added");
//       console.log(response);
//     });
//   }



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


newBook(e:any){
  let price = e.target.price.value;
  // let quantity = e.target.quantity.value;
  let description = e.target.description.value;
  if(this.selectedAuthorId==-1){
    this.selectedAuthorId = this.addAuthor(this.selectedAuthorFirstName, this.selectedAuthorLastName);
  }

  if(this.selectedCategoryId==-1){
    console.log(this.selectedCategory);
    this.selectedCategoryId = this.addCategory(this.selectedCategory);
  }
  if(this.selectedPublisherId==-1){
    this.selectedPublisherId = this.addPublisher(this.selectedPublisher);
  }
  let book ={      
        "title":this.newTitle,
          "publisher_id": this.selectedPublisherId,
          "price": price,
          "quantity": this.quantity,
          "description":description,
          "category_id":this.selectedCategoryId,
          // "cover":this.cover,
          "cover":"cover.jpg",
          "authors":[this.selectedAuthorId]
        };
        this.addBook(book);
        this.selectedCategory='';
        this.selectedAuthor='';
        this.selectedPublisher='';
        this.cover='';
        this.selectedCategoryId=-1;
        this.selectedAuthorId=1;
        this.selectedPublisherId=-1;
        this.newTitle='';
        this.quantity=undefined;
        this.description = '';
        this.price=undefined;
        
}

getAuthorId(){
  console.log(this.selectedAuthor);
  let name = this.selectedAuthor.split(" ");
  this.selectedAuthorFirstName = name[0];
  this.selectedAuthorLastName = name[name.length-1];
  let idFound = false;
  this.authors.forEach((a)=>{
    if(a.first_name==this.selectedAuthorFirstName && a.last_name== this.selectedAuthorLastName){
      this.selectedAuthorId=a.author_id;
      idFound=true;
    }
  })
  if(!idFound){
    this.selectedAuthorId = -1;
  }
}

getPublisherId(){
  let idFound = false;
  this.publishers.forEach((p)=>{
    if(p.publisher_name==this.selectedPublisher){
      this.selectedPublisherId=p.publisher_id;
      idFound=true;
    }
  })
  if(!idFound){
    this.selectedPublisherId = -1;
  }
}

getCategoryId(){
  let idFound = false;
  this.categories.forEach((c)=>{
    if(c.category_name==this.selectedCategory){
      this.selectedCategoryId=c.category_id;
      idFound=true;
    }
  })
  if(!idFound){
    this.selectedCategoryId = -1;
  }
}


transformFilter(e:any){
  this.filter=e.target.value.toLowerCase();
}

uploadFile(e:any){
  this.img = e.target.files[0];
  this.cover = e.target.files[0].name;
  }
  

}