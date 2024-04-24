import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { Recipe } from './recipe';
@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  baseUrl = 'http://localhost:3000'
 
  private recipeListSubject = new BehaviorSubject<Recipe[]>([]);
  recipeList$ = this.recipeListSubject.asObservable();

  constructor(private httpClient :  HttpClient) {
  }

  getRandomRecipes(): Observable<any>{
    return this.httpClient.get<Recipe[]>(`${this.baseUrl}/randomRecipes`);
  }

  // getRecipeListUpdates(): Observable<Recipe[]> {
  //   return this.recipeListSubject.asObservable();
  // }
  searchRecipes(ingredients: string): Observable<any>{
    return this.httpClient.get(`${this.baseUrl}/searchRecipes/${ingredients}`);
  }

  getRecipeDetails(recipeId : number): Observable<any>{
    console.log("service... ", recipeId)
    return this.httpClient.get(`${this.baseUrl}/recipe/${recipeId}`);
  }

  
}
