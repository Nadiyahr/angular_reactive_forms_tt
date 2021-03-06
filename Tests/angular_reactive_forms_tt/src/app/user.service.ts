import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CarEntity, OwnerEntity } from './owner';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnInit {
  private usersUrl = 'api/users';

  constructor(
    private _http: HttpClient,
  ) { }

  ngOnInit(): void { }

  getOwners(): Observable<OwnerEntity[]> {
    return this._http.get<OwnerEntity[]>(this.usersUrl);
  }

  getOwnerById(id: number): Observable<OwnerEntity> {
    return this._http.get<OwnerEntity>(`${this.usersUrl}/${id}`);
  }

  updateOwner(
    users: OwnerEntity, id: number
  ): Observable<any> {
    return this._http.put(`${this.usersUrl}/${id}`, users);
  }

  createOwner(
    aLastName: string,
    aFirstName: string,
    aMiddleName:string,
    aCars: CarEntity[]
  ): Observable<any> {
    let users: OwnerEntity[] = [];
    this.getOwners().subscribe(data => users = data)
    const aId = this.generateId(users)
    return this._http.post(`${this.usersUrl}`, {
      id: aId,
      lastName: aLastName,
      firstName: aFirstName,
      middleName: aMiddleName,
      cars: aCars
    });
  }

  deleteOwner(id: number): Observable<any> {
    return this._http.delete(`${this.usersUrl}/${id}`);
  }

  generateId(users: OwnerEntity[]): number {
    return users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 11;
  }
}
