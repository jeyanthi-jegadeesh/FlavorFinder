import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe';
import { RecipeService } from '../recipe.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {
    ingredients : string = '';
    recipes : Recipe[] = [];

     constructor( private recipeService : RecipeService,
                  private router : Router
     ){}
    ngOnInit(): void {
        
    }

    onSearch(ingredients: string){
      this.router.navigate(['/'],{
        queryParams: { search: this.ingredients }, // Pass search query as query parameter
      }); 
    }
   
}
