import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  filter:string='';
  constructor() { }

  ngOnInit(): void {
  }

  transformFilter(e:any){
    this.filter=e.target.value.toLowerCase();
  }

}
