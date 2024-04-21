import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { WishlistService } from '../wishlist.service';
import { Recipe } from '../recipe';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  wishlistCount: number = 0;
  recipes : Recipe[] = []
  constructor(private wishlistService : WishlistService) { }

  ngOnInit(): void {
    console.log('wishlist subscribed in Header')
    this.wishlistService.wishlist$.subscribe((recipes) => {
      this.wishlistCount = recipes.length; // Update the count when the wishlist changes     
    });
  }
  @Output() wishlistRecipes = new EventEmitter();

  onWishList(): void  {
    console.log("header getWishList")
    this.wishlistRecipes.emit();
  }


  logout() {
    // Actual logout to be implemented
    console.log('logged out');
  }
}
