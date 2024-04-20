import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'flavorfinder';

    recipes : Recipe[] = [];
    constructor(private recipeService : RecipeService) {}
  
    ngOnInit(): void {
      this.getRandomRecipes();
      
    }
    getRandomRecipes() : void{
        this.recipeService.getRandomRecipes().subscribe(response => {
        this.recipes = response.recipes;
      });
    }
  
    onSearch(ingredients: string){
      console.log(".......................... ", ingredients)
      this.recipeService.searchRecipes(ingredients).subscribe(response => {
        console.log('response..................  ',response)
        this.recipes = response;
        console.log(this.recipes[0].title);
      });
    }
}
