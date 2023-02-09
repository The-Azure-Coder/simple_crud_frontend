import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIResponse } from '../interfaces/apiResponse';
import { environment } from 'src/environments/environment';
import { catchError, Observable, of } from 'rxjs';
import { Item } from '../models/item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private BASE_URL = `${environment.API_SERVER}/items`

  private _ErrorHandler(returnValue: any) {
    return (err: any) => {
      console.log(err);
      return of({
        status: err.status,
        data: returnValue
      })

    }
  }

  constructor(private http: HttpClient) { }

  createItem(item: Partial<Item>): Observable<APIResponse<Item>> {
    return this.http.post<APIResponse<Item>>(this.BASE_URL, item).pipe(catchError(this._ErrorHandler(new Item())));
  }

  getAllItems(): Observable<APIResponse<Item[]>> {
    return this.http.get<APIResponse<Item[]>>(this.BASE_URL).pipe(catchError(this._ErrorHandler([])));
  }

  getItemById(_id: string): Observable<APIResponse<Item>> {
    return this.http.get<APIResponse<Item>>(`${this.BASE_URL}/${_id}`).pipe(catchError(this._ErrorHandler([])));

  }
  updateItem(_id: string, item: Item): Observable<APIResponse<Item>> {
    return this.http.put<APIResponse<Item>>(`${this.BASE_URL}/update/${_id}`, item).pipe(catchError(this._ErrorHandler(new Item())));
  }

  deleteService(_id: string): Observable<APIResponse<Item>> {
    return this.http
      .delete<APIResponse<Item>>(`${this.BASE_URL}/${_id}`)
      .pipe(catchError(this._ErrorHandler(new Item())));
  }

}
