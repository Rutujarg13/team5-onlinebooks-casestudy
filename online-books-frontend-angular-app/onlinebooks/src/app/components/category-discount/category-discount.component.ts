import { Component, OnInit } from '@angular/core';
import { DiscountmanagementService } from 'src/app/services/discountmanagement.service';
import { PoductmanagementService } from 'src/app/services/poductmanagement.service';
import { Book } from 'src/app//modules/book';
import { Category } from 'src/app//modules/category';

@Component({
  selector: 'app-category-discount',
  templateUrl: './category-discount.component.html',
  styleUrls: ['./category-discount.component.css']
})
export class CategoryDiscountComponent implements OnInit {
  viewMode = 'categoryDiscount';
  discountManagementService: DiscountmanagementService;
  productManagementService: PoductmanagementService;
  minDate = new Date().toISOString().split('T')[0];
  discounts:any[] = [];
  books:Book[] = [];
  categories:Category[]=[];
  booksAuthors:any[]=[];
  discountForm:any;
  successMsg:string='';

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

  addDiscount(bookId:number, form:any){
  let discount = form.value.discount;
  let startStamp = form.value.startDate + " " + form.value.startTime;
  let endStamp = form.value.endDate + " " + form.value.endTime;
  let now = Date.now();
  let isActive = now> Date.parse(startStamp) && now< Date.parse(endStamp) ? true :false;
  let newDiscount ={
    "book_id": bookId,
    "discount": discount,
    "start_stamp": startStamp, 
    "end_stamp": endStamp, 
    "is_active":isActive
  }
  this.discountManagementService.addDiscount(newDiscount)
      .subscribe((response:any)=>{
        this.getDiscounts();
      },(error:any)=>{
        console.log(error);
      }
      );
    }
    
  addCategoryDiscount(form:any){
    let categoryId = form.value.categoryId;
    this.books.forEach(book=>{
      if(book.category_id==categoryId){
        this.addDiscount(book.book_id, form);
      }
    })
     form.resetForm();
     this.successMsg = 'Discount has been applied'
  }

}
