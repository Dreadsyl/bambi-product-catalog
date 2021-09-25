import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  constructor(private http: HttpClient) {}

  public getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.BASE_URL}/products`);
  }

  public getProductDetails(id: string): Observable<Product> {
    return this.http.get<Product>(`${environment.BASE_URL}/products/${id}`);
  }

  public saveProduct(product: any): Observable<any> {
    return this.http.post<any>(`${environment.BASE_URL}/products`, product);
  }

  public updateProduct(product: any, id: string): Observable<any> {
    return this.http.put<any>(
      `${environment.BASE_URL}/products/${id}`,
      product
    );
  }

  public deleteProduct(id: string): Observable<Product> {
    return this.http.delete<Product>(`${environment.BASE_URL}/products/${id}`);
  }

  //---PRODUCT CLASS---//
  public getProductClass(): Observable<any> {
    return this.http.get<any>(`${environment.BASE_URL}/productClass`);
  }

  public addProductClass(productClass: any): Observable<any> {
    return this.http.post<any>(
      `${environment.BASE_URL}/productClass`,
      productClass
    );
  }

  public deleteProductClass(id: string): Observable<any> {
    return this.http.delete<any>(`${environment.BASE_URL}/productClass/${id}`);
  }
}
