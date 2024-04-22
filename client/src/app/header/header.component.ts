import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { WishlistService } from '../wishlist.service';
import { Recipe } from '../recipe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  wishlistCount: number = 0;
  recipes : Recipe[] = []
  constructor(private wishlistService : WishlistService, 
            private router : Router) { }

  ngOnInit(): void {
    this.wishlistService.wishlist$.subscribe((recipes) => {
      this.wishlistCount = recipes.length; // Update the count when the wishlist changes     
    });
  }
  @Output() wishlistRecipes = new EventEmitter();

  onWishList(): void  {
    this.router.navigate(['/'],{
      queryParams: { wishlist: this.wishlistCount }, // Pass search query as query parameter
    }); 
  }


  logout() {
    // Actual logout to be implemented
    console.log('logged out');
  }
}
