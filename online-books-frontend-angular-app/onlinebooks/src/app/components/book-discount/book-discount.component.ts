import { Component, OnInit } from '@angular/core';
import { DiscountmanagementService } from 'src/app/services/discountmanagement.service';
import { PoductmanagementService } from 'src/app/services/poductmanagement.service';

@Component({
  selector: 'app-book-discount',
  templateUrl: './book-discount.component.html',
  styleUrls: ['./book-discount.component.css']
})
export class BookDiscountComponent implements OnInit {
  viewMode = 'bookDiscount';
  discountManagementService: DiscountmanagementService;
  productManagementService: PoductmanagementService;
  minDate = new Date().toISOString().split('T')[0];
  discounts:any[] = [];
  books:any[] = [];
  categories:any[]=[];
  booksAuthors:any[]=[];
  filter:string='';
  discountForm:any;

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

  addDiscount(form:any){
  let bookId = form.value.bookId;
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
        // this.discount=0;
      },(error:any)=>{
        console.log(error);
      }
      );
      form.resetForm();
    }
    
    transformFilter(e:any){
      this.filter=e.target.value.toLowerCase();
    }

}

