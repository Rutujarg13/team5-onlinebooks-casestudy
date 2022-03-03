import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categoryList:any[]=[];

  api:ApiService;

    constructor(api:ApiService) {
    this.api=api
   }

  
  ngOnInit(): void {


    this.api.getCategories()
    .subscribe((response:any)=>{
        this.categoryList=response;
        console.log(response);  
        
    })


    
  }
}
