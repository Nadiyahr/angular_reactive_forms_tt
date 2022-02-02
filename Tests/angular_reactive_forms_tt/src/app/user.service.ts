import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CarEntity, OwnerEntity } from './owner';
import { Observable, throwError } from 'rxjs';
import {catchError} from 'rxjs/operators';

const cudOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnInit {
  private usersUrl = 'api/users';

  constructor(
    private _http: HttpClient,
  ) { }

  ngOnInit(): void { }

  getgetOwners(): Observable<OwnerEntity[]> {
    return this._http.get<OwnerEntity[]>(this.usersUrl);
  }

  getOwnerById(id: number): Observable<OwnerEntity> {
    return this._http.get<OwnerEntity>(`${this.usersUrl}/${id}`)
  }

  // createOwner(
  //   aLastName: string,
  //   aFirstName: string,
  //   aMiddleName: string,
  //   aCars: CarEntity[]
  // ): Observable<OwnerEntity> {
  //   return this._http.post<any>(`${this.usersUrl}/post/1`)
  // }
}
