import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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
    console.log( 'recipe service called')
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
    return this.httpClient.get(`${this.baseUrl}/recipeDetails/${recipeId}`);
  }
}
