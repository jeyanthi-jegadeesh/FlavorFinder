import { Component, Input } from '@angular/core';
import { Recipe } from '../recipe';
@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrl: './recipe-item.component.css'
})
export class RecipeItemComponent {
  @Input() recipe: Recipe ;

  recipeDetail() {
    // const id = this.recipe.id == null ? this.recipe.recipeId : this.recipe.id;
    return `/recipeDetail/${this.recipe.id}`;
  }
}
