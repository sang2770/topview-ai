import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API, setUrlHandler, URL_HANDLER } from '../constants/api';
import { environment } from '../../assets/environments/environment';

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

  getTemplatesAnyShot() {
    return this.http.get('/assets/data/avatar-category.json');
  }

  getAvatarList() {
    return this.http.get('/assets/data/avatar.json');
  }

  getHomeData() {
    return this.http.get('/assets/data/home.json');
  }

  enrichUrl(url: string) {
    const serverUrl = environment.server;
    if (url?.startsWith('http') || !url) return url;
    return `${serverUrl}${url}`;
  }
}
