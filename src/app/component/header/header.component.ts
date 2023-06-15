import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  public totalItem: number = 0;
  // totalItem this is where we want our bage count to be

  constructor(private cart: CartService) {}

  ngOnInit(): void {
    // our badge count code using behaviour subject
    this.cart.getProducts().subscribe((res) => {
      this.totalItem = res.length;
    });
  }
}
