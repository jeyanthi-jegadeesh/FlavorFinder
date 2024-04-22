import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe';
import { RecipeService } from './recipe.service';
import { WishlistService } from './wishlist.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'flavorfinder';

    recipes : Recipe[] = [];
    wishlist : Recipe[] = [];
    constructor(
      private recipeService : RecipeService,
      private wishlistService: WishlistService
    ) {}
  
    ngOnInit(): void {
       this.getRandomRecipes();
    }
    getRandomRecipes() : void{
        console.log("getRandome Recipes called")
        this.recipeService.getRandomRecipes().subscribe(response => {
        console.log(response.recipes)
        this.recipes = response.recipes;
      });
    }

    onWishList() : void{
      console.log('wishlist  in app')
       // Subscribe to the wishlist subject to keep track of the latest state
      this.wishlistService.wishlist$.subscribe((recipes) => {
        
        console.log('wishlist = ',recipes.length);
      this.recipes = recipes; // Update the component's wishlist
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
