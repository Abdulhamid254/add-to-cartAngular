import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public cartItemList: any = [];
  // productlist below will both work as observable and also responsible for emmiting the data
  public productList = new BehaviorSubject<any>([]); // here we have initialsed as empty array as our initial value because our product list is an array
  // productList$ = new BehaviorSubject<any>([]);

  constructor() {}
  // whoever will make use of the getProducts method he will subscribe to it
  getProducts() {
    return this.productList.asObservable();
    // return this.productList$;
  }
  // in the setter we are pushing the product into the cartList then we are emmitting the data next used for emitting
  setProduct(product: any) {
    this.cartItemList.push(...product);
    this.productList.next(product);

    // next here helps in passing data whererever the productlist is subscribed
  }
  addtoCart(product: any) {
    this.cartItemList.push(product);
    this.productList.next(this.cartItemList);
    this.getTotalPrice();
    // console.log(this.cartItemList);
  }
  getTotalPrice(): number {
    let grandTotal = 0;
    this.cartItemList.map((a: any) => {
      //a here is everything inside the cartItemlist
      grandTotal += a.total;
    });
    return grandTotal;
  }
  removeCartItem(product: any) {
    //removing 1 item from our array
    this.cartItemList.map((a: any, index: any) => {
      if (product.id === a.id) {
        this.cartItemList.splice(index, 1);
      }
    });
  }
  removeAllCart() {
    this.cartItemList = [];
    this.productList.next(this.cartItemList); //resetting after subscribing
  }
}
