import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  public products: Record<string, string | number | Record<string, number>>[] =
    [];
  public grandTotal!: number;

  constructor(private cart: CartService) {}

  ngOnInit(): void {
    this.cart.getProducts().subscribe((res) => {
      this.products = res;
      // console.log(this.products);

      this.grandTotal = this.cart.getTotalPrice();
    });
  }
  removeItem(item: Record<string, string | number | Record<string, number>>) {
    this.cart.removeCartItem(item);
  }
  emptycart() {
    this.cart.removeAllCart();
  }
}
