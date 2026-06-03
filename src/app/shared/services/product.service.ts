import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderType } from 'src/types/order.type';
import { ProductType } from 'src/types/product.type';


@Injectable({
  providedIn: 'root'
})

export class ProductService {
  constructor(private http: HttpClient) { }

  getProducts(): Observable<ProductType[]> {

    return this.http.get<ProductType[]>('https://testologia.ru/tea')
  }

  getProduct(id: number): Observable<ProductType> {
    return this.http.get<ProductType>('https://testologia.ru/tea?id=' + id);
  }

  createOrder(data: OrderType) {
    return this.http.post<{ success: boolean, message?: string }>('https://testologia.ru/order-tea', data);
  }
}
