import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  name!:string;
  
  productList:any[]=[];

  api:ApiService;
  constructor(api:ApiService) {
    this.api=api
   }

  ngOnInit(): void {

    this.api.getAllBooks()
    .subscribe((response:any)=>{
        this.productList=response;
        console.log(response);
        
    },(error)=>{
      console.log(error)
    })

    
  
    
    

   /* this.api.getProductByDiscount()
    .subscribe((response)=>{
      console.log("get product by discount");
      console.log(response);
    },(error)=>{
      console.log(error)
    })

    

    this.api.search("Hexagon","")
    .subscribe((response)=>{
      console.log("get product by title or author");
      console.log(response);
    },(error)=>{
      console.log(error)
    })*/

    
  }

  

  


}
