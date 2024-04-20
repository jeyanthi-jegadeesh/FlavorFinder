import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {
    ingredients : string = '';
    constructor(){}
    ngOnInit(): void {
        
    }

    @Output() searchRecipes = new EventEmitter<string>();

    onSearch(): void  {
      this.searchRecipes.emit(this.ingredients);
    }
}
