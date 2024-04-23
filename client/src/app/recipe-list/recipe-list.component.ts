import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../recipe';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute } from '@angular/router';
import { WishlistService } from '../wishlist.service';
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent implements OnInit{

  // @Input()
  recipes : Recipe[] = [];

  constructor(
    private recipeService : RecipeService,
    private route: ActivatedRoute,
    private wishlistService : WishlistService
  ){}

  ngOnInit(): void {
   
    this.route.queryParams.subscribe((params) => {
      const ingredients = params['search'];
      const wishlistCount = params['wishlist'];
      if (ingredients) {
        this.searchRecipes(ingredients); 
      } else if (wishlistCount){
        this.wishlistService.wishlist$.subscribe((recipes) => {
          this.recipes = recipes; 
        });
      }
      else {
        // fetch random recipes by default
          this.getRandomRecipes();  
      }
    });
 }
 
 searchRecipes(ingredients :string){
     this.recipeService.searchRecipes(ingredients).subscribe(response => {
       this.recipes = response;
    });
    }

 getRandomRecipes() : void{
  this.recipeService.getRandomRecipes().subscribe(response => {
  this.recipes = response.recipes;
});
}
}
