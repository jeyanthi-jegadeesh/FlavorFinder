import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  baseUrl = 'http://localhost:3000'
  constructor(private httpClient :  HttpClient) { }

  getRandomRecipes(): Observable<any>{
    return this.httpClient.get(this.baseUrl+'/randomRecipes');
  }

  searchRecipes(ingredients: string): Observable<any>{
    const params = new HttpParams().set('ingredients', ingredients);
    return this.httpClient.get(this.baseUrl+'/searchRecipes/', { params });
  }


}
