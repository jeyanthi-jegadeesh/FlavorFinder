import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Recipe } from './recipe';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  baseUrl = 'http://localhost:3000';

  // This subject holds the wishlist recipes of a user and its subscribed in Header component
  // (to get the wishlist count ) and in app component( to get the wishlist recipes on click of wishlist button)
  private wishlistSubject = new BehaviorSubject<Recipe[]>([]);
  wishlist$ = this.wishlistSubject.asObservable(); 

  constructor(private http: HttpClient) {
    this.fetchWishlist(); 
  }

  fetchWishlist(): void {
     // email id hard coded as login component is not yet implemented
    const email = 'test@test.com';
    this.http.get<Recipe[]>(`${this.baseUrl}/wishList/${email}`).subscribe((recipes) => {
      this.wishlistSubject.next(recipes);
    });
  }
  saveRecipe(recipe : Recipe): Observable<any>{
    const data = {
      recipe: recipe, 
      userId: '66213ceb4d63e240f069d8d6'
    };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' }); 
    return this.http
      .post(`${this.baseUrl}/saveRecipe`,data, { headers }) // HTTP POST request
  }
  
  addRecipeToWishlist(recipe: Recipe): void {    
      const currentWishlist = this.wishlistSubject.getValue();
      this.wishlistSubject.next([...currentWishlist, recipe]); // Update the wishlist state
  }

  // This method is called from recipe service to update the new wishlist recipes from DB
  updateWishlist(recipes: Recipe[]) {
    this.wishlistSubject.next(recipes); 
  }


}