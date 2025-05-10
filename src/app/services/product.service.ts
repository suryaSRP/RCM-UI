import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  API_URL: string = 'http://localhost:8081';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};
  constructor(
    private httpClient: HttpClient,
    public router: Router,
    private route: ActivatedRoute
  ) { }
  createProduct(formValue: any): Observable<any> {
    return this.httpClient.post(`${this.API_URL}/api/productSave`, formValue, { headers: this.headers })
  }
listProduct(): Observable<any> {
    return this.httpClient.get(`${this.API_URL}/api/productList`, { headers: this.headers })
  }
  getCategory(): Observable<any> {
    return this.httpClient.get(`${this.API_URL}/api/categoryList`, { headers: this.headers })
  }
}
