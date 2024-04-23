import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe';
import { Location } from '@angular/common';
import { WishlistService } from '../wishlist.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css'
})
export class RecipeDetailComponent implements OnInit{

  recipe: Recipe;
  errorMessage : string;
  instructionList : string[];
  constructor(
    private router : ActivatedRoute,
    private recipeService : RecipeService,
    private location: Location,
    private wishlistService : WishlistService,
    private snackBar: MatSnackBar
  ){}

  ngOnInit(): void {
     this.getRecipeDetails();
  }

  getRecipeDetails(){
    this.router.params.subscribe((params: Params) => {
      const recipeId =  params['id'];
      this.recipeService.getRecipeDetails(recipeId)
      .subscribe(recipe => {
          let instructions = recipe.instructions;
            // Remove HTML tags and split based on list item delimiters
          const cleanedInstructions = instructions.replace(/<\/?ol>|<\/?li>/g, ''); // Remove <ol> and <li> tags
          const rawSteps = cleanedInstructions.split('.'); // Split by periods
          const steps = rawSteps
            .map((step: string) => step.trim()) // Trim leading and trailing spaces
            .filter((step: string) => step.length > 0); // Keep only non-empty strings
          this.instructionList = steps;
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
        this.showErrorSnackbar('Recipe saved to the user wishlist');
      },
      error: (error) => {
        this.errorMessage = "Recipe already Exists in User Wishlist"; // set the error message to display it in the UI
        this.showErrorSnackbar(this.errorMessage);
      },
    });
  }

  // Function to show the snackbar with the error message
  showErrorSnackbar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000, // Snackbar duration in milliseconds
      horizontalPosition: 'center', // Horizontal position
      verticalPosition: 'top', // Vertical position
    });
  }


}
