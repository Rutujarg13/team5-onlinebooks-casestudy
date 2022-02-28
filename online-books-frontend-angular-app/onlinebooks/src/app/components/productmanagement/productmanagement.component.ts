import { Component, OnInit } from '@angular/core';
import { PoductmanagementService } from 'src/app/services/poductmanagement.service';

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
  bookId:any;
  bookAuthors:any[]=[];
  constructor(service: PoductmanagementService) {
    this.productManagementService = service;
   }

  ngOnInit(): void {
    this.getAllBooks();

    this.productManagementService.getBooksAuthors()
    .subscribe((response:any)=>{
      this.booksAuthors = response;
      console.log("Books Authors")
      console.log(response);
    });

    this.productManagementService.getCategories()
    .subscribe((response:any)=>{
      this.categories = response;
      console.log("Categories")
      console.log(response);
    });

    this.productManagementService.getPublishers()
    .subscribe((response:any)=>{
      this.publishers = response;
      console.log("Publishers")
      console.log(response);
    });

    this.productManagementService.getAuthors()
    .subscribe((response:any)=>{
      this.authors = response;
      console.log("Authors");
      console.log(response);
    });
}

getAllBooks(){
  this.productManagementService.getAllBooks()
    .subscribe((response:any)=>{
      this.bookList = response;
      console.log("Get all books");
      console.log(response);
    }
    );
}

getAuthorsOfTheBook(bookId:any){
  this.productManagementService.getBookAuthors(bookId)
  .subscribe((response:any)=>{
    this.bookAuthors = response;
    console.log("Get Authors of the Book");
    console.log(response);
  });
}

deleteBooksAuthor(bookId:number, authorId:number){
  let bookAuthor = {"book_id":bookId, "author_id":authorId};
  this.productManagementService.deleteBooksAuthor(bookAuthor)
  .subscribe((response:any)=>{
    console.log("Delete Book's Author")
    console.log(response);
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

//add book
addBook(title:string, publisherId: number, price:number, quantity:number, description:string, categoryId:number, cover:string, authors:string[]){
  let book ={
      "title":title,
        "publisher_id": publisherId,
        "price":price,
        "quantity":quantity,
        "description":description,
        "category_id":categoryId,
        "cover":cover,
        "authors":authors
  };
    this.productManagementService.addBook(book)
    .subscribe((response:any)=>{
      console.log("Book Added");
      console.log(response);
    });
  }


//add author
addAuthor(firstName:string, lastName:string){
let author = {
  "firstName":"Ernest",
  "lastName":"Hemingway"
}
this.productManagementService.addAuthor(author)
.subscribe((response:any)=>{
  console.log("Author Added");
  console.log(response);
});
}

//add publisher
addPublisher(publisherName:string){
  let publisher={ "publisher_name":publisherName};
  this.productManagementService.addPublisher(publisher)
.subscribe((response:any)=>{
  console.log("Publisher Added");
  console.log(response);
});
}


//add category
addCategory(categoryName:string){
  let category={ "category_name":categoryName};
  this.productManagementService.addPublisher(category)
.subscribe((response:any)=>{
  console.log("Category Added");
  console.log(response);
});
}

transformFilter(e:any){
  this.filter=e.target.value.toLowerCase();
}

}