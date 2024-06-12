import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { IProduct } from './product.model';
import { CartService } from '../cart.service';
import { ProductService } from './product.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'bot-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],
})
export class CatalogComponent implements OnInit, OnDestroy {
  products!: IProduct[];
  filter: string = '';
  subProducts!: Subscription;

  constructor(
    private cartSvc: CartService,
    private productsService: ProductService
  ) {}

  ngOnInit(): void {
    this.subProducts = this.productsService.getProducts$.subscribe(
      (products) => {
        this.products = products;
      }
    );
  }

  ngOnDestroy(): void {
    this.subProducts.unsubscribe();
  }

  addToCart(product: IProduct) {
    this.cartSvc.add(product);
  }

  getFilteredProducts() {
    return this.filter === ''
      ? this.products
      : this.products.filter(
          (product: any) => product.category === this.filter
        );
  }
}
