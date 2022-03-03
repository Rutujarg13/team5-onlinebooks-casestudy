import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-lowprice',
  templateUrl: './lowprice.component.html',
  styleUrls: ['./lowprice.component.css']
})
export class LowpriceComponent implements OnInit {
  name!:string;
  BookPriceLow:any[]=[];

  api:ApiService;
  constructor(api:ApiService) {
    this.api=api
   }

  ngOnInit(): void {

    this.api.getLowPrice()
    .subscribe((response:any)=>{
        this.BookPriceLow=response;
        console.log(response);
        
    },(error)=>{
      console.log(error)
    })
  }

}
