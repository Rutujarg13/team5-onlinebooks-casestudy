import { Component, OnInit } from '@angular/core';
import { DiscountmanagementService } from 'src/app/services/discountmanagement.service';
import { PoductmanagementService } from 'src/app/services/poductmanagement.service';


@Component({
  selector: 'app-discountmanagement',
  templateUrl: './discountmanagement.component.html',
  styleUrls: ['./discountmanagement.component.css']
})
export class DiscountmanagementComponent implements OnInit {
  discountManagementService: DiscountmanagementService;
  productManagementService: PoductmanagementService;
  discounts:any[] = [];
  books:any[] = [];
  bookId:any='Select Book';
  categories:any[]=[];
  booksAuthors:any[]=[];
  discount:number=0;
  updatedDiscount:number=0;
  filter:string='';
  errorMsg='';
  categoryId:any='Select Category';
  categoryErrorMsg = '';

  constructor(service: DiscountmanagementService, prodService:PoductmanagementService) { 
    this.discountManagementService = service;
    this.productManagementService=prodService;
  }

  ngOnInit(): void {
    this.getDiscounts();


    this.productManagementService.getAllBooks()
    .subscribe((response:any)=>{
      this.books = response;
    }
    );

    this.productManagementService.getBooksAuthors()
    .subscribe((response:any)=>{
      this.booksAuthors = response;
    });

    this.productManagementService.getCategories()
    .subscribe((response:any)=>{
      this.categories=response;
    })
  }

  getDiscounts(){
    this.discountManagementService.getDiscounts()
    .subscribe((response:any)=>{
      this.discounts=response;
    });


  }

  addDiscount(){
    if(this.bookId != 'Select Book'){
    this.bookId= parseInt(this.bookId);
    this.discountManagementService.addDiscount(this.bookId, this.discount)
    .subscribe((response:any)=>{
      this.getDiscounts();
      this.discount=0;
      this.errorMsg='';
      this.categoryErrorMsg = '';
    },(error:any)=>{
      this.errorMsg='This book is already discounted. Use section below to edit or detele the discount for the book.';
    }
    );
  }
}

  updateDiscount(bookId:any){
    bookId=parseInt(bookId)
    this.discountManagementService.editDiscount(bookId, this.updatedDiscount)
    .subscribe((response:any)=>{
      this.getDiscounts();
    })
  }
  
  changeDiscount(e:any){
    this.updatedDiscount=e.target.value;
  }
  
  deleteDiscount(bookId:any){
    bookId=parseInt(bookId);
    this.discountManagementService.deleteDiscount(bookId)
    .subscribe((Response:any)=>{
      this.getDiscounts();
    })
  }

  transformFilter(e:any){
    this.filter=e.target.value.toLowerCase();
  }

  addCategoryDiscount(){
    this.books.forEach(book=>{
      if(book.category_id==this.categoryId){
        this.bookId = book.book_id;
        this.addDiscount();
        this.categoryErrorMsg = '';
      }
      else{
        this.categoryErrorMsg='No books in selected category';
      }
    })
  }

}
