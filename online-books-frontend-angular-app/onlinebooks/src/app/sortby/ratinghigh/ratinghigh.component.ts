import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-ratinghigh',
  templateUrl: './ratinghigh.component.html',
  styleUrls: ['./ratinghigh.component.css']
})
export class RatinghighComponent implements OnInit {
  name!:any;
  BookRatingHigh:any[]=[];

  api:ApiService;
  constructor(api:ApiService) {
    this.api=api
   }

  ngOnInit(): void {

    this.api.getRatingHigh()
    .subscribe((response:any)=>{
        this.BookRatingHigh=response;
        console.log(response);
        
    },(error)=>{
      console.log(error)
    })
  }

}
