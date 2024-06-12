import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from './product.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productsUrl = '/api/products';

  constructor(private http: HttpClient) {}

  readonly getProducts$ = this.http.get<IProduct[]>(this.productsUrl);
}
