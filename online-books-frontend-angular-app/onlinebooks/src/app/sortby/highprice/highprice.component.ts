import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-highprice',
  templateUrl: './highprice.component.html',
  styleUrls: ['./highprice.component.css']
})
export class HighpriceComponent implements OnInit {
 name!:string;
  BookPriceHigh:any[]=[];

  api:ApiService;
  constructor(api:ApiService) {
    this.api=api
   }

  ngOnInit(): void {

    this.api.getHighPrice()
    .subscribe((response:any)=>{
        this.BookPriceHigh=response;
        console.log(response);
        
    },(error)=>{
      console.log(error)
    })
  }

}
