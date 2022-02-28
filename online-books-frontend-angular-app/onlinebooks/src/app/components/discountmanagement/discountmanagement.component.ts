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
  categories:any[]=[];
  booksAuthors:any[]=[];
  discount:number=0;
  bookId:any='';
  updatedDiscount:number=0;

  constructor(service: DiscountmanagementService, prodService:PoductmanagementService) { 
    this.discountManagementService = service;
    this.productManagementService=prodService;
  }

  ngOnInit(): void {
    this.getDiscounts();


    this.productManagementService.getAllBooks()
    .subscribe((response:any)=>{
      this.books = response;
      console.log(response);
    }
    );

    this.productManagementService.getBooksAuthors()
    .subscribe((response:any)=>{
      this.booksAuthors = response;
      console.log(response);
    });
  }

  getDiscounts(){
    this.discountManagementService.getDiscounts()
    .subscribe((response:any)=>{
      this.discounts=response;
      console.log(response);
    });
  }

  addDiscount(){
    if(this.bookId != ''){
    this.bookId= parseInt(this.bookId);
    this.discountManagementService.addDiscount(this.bookId, this.discount)
    .subscribe((response:any)=>{
      this.getDiscounts();
    });
  }
}

  updateDiscount(){
    console.log();
  }

  deleteDiscount(bookId:any){
    this.bookId=parseInt(bookId);
    this.discountManagementService.deleteDiscount(this.bookId)
    .subscribe((Response:any)=>{
      this.getDiscounts();
    })
  }

}
