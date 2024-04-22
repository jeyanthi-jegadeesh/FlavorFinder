import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
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
     console.log('.... fetchwishlist')
    const email = 'test@test.com';
    this.http.get<Recipe[]>(`${this.baseUrl}/wishList/${email}`).subscribe((recipes) => {
      this.wishlistSubject.next(recipes);
    });
  }

  addRecipeToWishlist(recipe: Recipe): void {
    this.http.post('https://api.example.com/wishlist', recipe).subscribe(() => {
      const currentWishlist = this.wishlistSubject.getValue();
      this.wishlistSubject.next([...currentWishlist, recipe]); // Update the wishlist state
    });
  }

}