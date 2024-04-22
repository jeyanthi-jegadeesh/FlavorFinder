import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe';
import  mockRecipes  from '../mock-recipe-detail';
import { Location } from '@angular/common';
import { WishlistService } from '../wishlist.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css'
})
export class RecipeDetailComponent implements OnInit{

  recipe: Recipe;
  errorMessage : string;
  constructor(
    private router : ActivatedRoute,
    private recipeService : RecipeService,
    private location: Location,
    private wishlistService : WishlistService
  ){}

  ngOnInit(): void {
    //this.getRecipeDetails();
     this.recipe = mockRecipes;
  }

  getRecipeDetails(){
    this.router.params.subscribe((params: Params) => {
      const recipeId =  params['id'];
      this.recipeService.getRecipeDetails(recipeId)
      .subscribe(recipe => {
        this.recipe = recipe;
      });
    });
  }

  back() {
    this.location.back(); // navigates one step back on the history
  }
  saveRecipe(){
    this.wishlistService.saveRecipe(this.recipe).subscribe({
      next: (data) => {
        this.recipe = data;
        this.wishlistService.addRecipeToWishlist(this.recipe);
        this.errorMessage = ''; // Reset error message if data is successfully retrieved
      },
      error: (error) => {
        this.errorMessage = "Recipe already Exists in User Wishlist"; // set the error message to display it in the UI
      },
    });
  }
}
