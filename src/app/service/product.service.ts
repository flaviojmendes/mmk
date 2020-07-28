import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productsUrl = environment.backendUrl + '/product/';

  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get<Product[]>(this.productsUrl);
  }

  getProductsByCategory(categoryId: string) {
    return this.http.get<Product[]>(this.productsUrl + categoryId);
  }

  saveProduct(product: Product, companyId: string) {
    return this.http.post<Product[]>(this.productsUrl + companyId, product);
  }

  deleteProduct(product: Product, companyId: string) {
    return this.http.request('delete', this.productsUrl + companyId, {body: product});
  }


}
