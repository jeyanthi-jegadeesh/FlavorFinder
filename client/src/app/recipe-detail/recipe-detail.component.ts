import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe';
import  mockRecipes  from '../mock-recipe-detail';
@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css'
})
export class RecipeDetailComponent implements OnInit{

  recipe: Recipe;
  constructor(
    private router : ActivatedRoute,
    private client : RecipeService
  ){}

  ngOnInit(): void {
    this.getRecipeDetails();
    // this.recipe = mockRecipes;
    // console.log('mock recipes..',mockRecipes.title)
  }

  getRecipeDetails(){
    console.log('details...................', )
    this.router.params.subscribe((params: Params) => {
      const recipeId =  params['id'];
      console.log(recipeId)
      this.client.getRecipeDetails(recipeId)
      .subscribe(recipe => {
        this.recipe = recipe;
       console.log(this.recipe.title)
      });
    });
  }

  saveRecipe(){
    console.log("save recipe");
  }
}
