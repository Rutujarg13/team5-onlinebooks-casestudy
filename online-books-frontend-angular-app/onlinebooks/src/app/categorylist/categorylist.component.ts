import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-categorylist',
  templateUrl: './categorylist.component.html',
  styleUrls: ['./categorylist.component.css']
})
export class CategorylistComponent implements OnInit {

  id:any;
  name:any;
  activeroute: ActivatedRoute;
  
  api:ApiService;
  categoryDetails:any[]=[];
  constructor(activeroute: ActivatedRoute,api:ApiService) { 
    this.activeroute = activeroute;
    this.api=api
  }

  ngOnInit(): void {
    // this.name = this.activeroute.snapshot.paramMap.get('title');
    this.id = this.activeroute.snapshot.paramMap.get('id');

    this.api.getBookByCategory(this.id)
    .subscribe((response:any)=>{
        this.categoryDetails=response;
        console.log(response);
        
    },(error)=>{
      console.log(error)
    })

    
  }

}
