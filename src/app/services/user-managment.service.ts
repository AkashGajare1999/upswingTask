import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserManagmentService {
  APIURL = environment.APIUrl;
  constructor(private httpClient: HttpClient) {}

  addProduct(user: any) {
    return this.httpClient.post(this.APIURL + 'products', user).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  getAllProducts() {
    return this.httpClient.get(this.APIURL + 'products').pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  updateProduct(id: any, Product: any) {
    return this.httpClient.put(this.APIURL + 'products/' + id, Product).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  viewProduct(id: any) {
    console.log('id', id);
    return this.httpClient.get(this.APIURL + `products?id=${id}`).pipe(
      map((res: any) => {
        console.log('res', res);
        return res;
      })
    );
  }

  DeleteProduct(id: any) {
    return this.httpClient.delete(this.APIURL + 'products/' + id).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
}
