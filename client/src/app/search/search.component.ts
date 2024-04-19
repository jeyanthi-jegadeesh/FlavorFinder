import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {
    ingredients : string = '';
    constructor(private service : RecipeService){}
    ngOnInit(): void {
        
    }

    searchRecipes(ingredients: string){
      this.service.searchRecipes(ingredients);
    }
}
