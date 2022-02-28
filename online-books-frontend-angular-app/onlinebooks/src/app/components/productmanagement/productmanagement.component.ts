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
  booksAuthors:any[]=[];
  filter:string='';
  constructor(service: PoductmanagementService) {
    this.productManagementService = service;
   }

  ngOnInit(): void {
    this.productManagementService.getAllBooks()
    .subscribe((response:any)=>{
      this.bookList = response;
      console.log(response);
    }
    )

    this.productManagementService.getBooksAuthors()
    .subscribe((response:any)=>{
      this.booksAuthors = response;
      console.log(response);
    })

}
transformFilter(e:any){
  this.filter=e.target.value.toLowerCase();
}
}