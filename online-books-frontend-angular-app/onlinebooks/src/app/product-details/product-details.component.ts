import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  name!:any;
  id:any;
  activeroute: ActivatedRoute;

  api:ApiService;
  
  bookDetails:any[]=[];
  constructor(activeroute: ActivatedRoute,api:ApiService) { 
    this.activeroute = activeroute;
    this.api=api
  }

  ngOnInit(): void {
    // this.name = this.activeroute.snapshot.paramMap.get('title');
    this.id = this.activeroute.snapshot.paramMap.get('id');

    this.api.getBookDetails(this.id)
    .subscribe((response:any)=>{
        this.bookDetails=response;
        console.log(response);
        
    },(error)=>{
      console.log(error)
    })

    
  }

}
