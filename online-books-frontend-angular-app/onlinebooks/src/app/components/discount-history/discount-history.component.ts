import { Component, OnInit } from '@angular/core';
import { DiscountmanagementService } from 'src/app/services/discountmanagement.service';
import { PoductmanagementService } from 'src/app/services/poductmanagement.service';
import { Book } from 'src/app//modules/book';
import { Category } from 'src/app//modules/category';

@Component({
  selector: 'app-discount-history',
  templateUrl: './discount-history.component.html',
  styleUrls: ['./discount-history.component.css']
})
export class DiscountHistoryComponent implements OnInit {
  viewMode = 'discountHistory';
  discountManagementService: DiscountmanagementService;
  productManagementService: PoductmanagementService;
  discounts:any[] = [];
  books:Book[] = [];
  categories:Category[]=[];
  booksAuthors:any[]=[];
  filter:string='';

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
  
  transformFilter(e:any){
    this.filter=e.target.value.toLowerCase();
  }


}
