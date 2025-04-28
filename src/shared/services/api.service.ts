import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API, setUrlHandler, URL_HANDLER } from '../constants/api';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getProduct(url: string) {
    return this.http.post(API.GET_PRODUCT, { url });
  }

  getUrlListHandle() {
    this.http.get('/assets/data/router.json').subscribe((res) => {
      setUrlHandler(res);
    });
  }

  getProductCategory() {
    return this.http.get('/assets/data/product-category.json');
  }
}
