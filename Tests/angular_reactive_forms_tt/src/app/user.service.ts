import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CarEntity, OwnerEntity } from './owner';
import { Observable, throwError } from 'rxjs';
import {catchError} from 'rxjs/operators';
import { MessageSpan } from '@angular/compiler/src/i18n/i18n_ast';

const crudOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnInit {
  private usersUrl = 'api/users';

  constructor(
    private _http: HttpClient,
    // private messagesService: MessageSpan
  ) { }

  // private log(message: string): void {
  //   this.messagesService.add('UserSertvice' + message)
  // }



  ngOnInit(): void { }

  getgetOwners(): Observable<OwnerEntity[]> {
    return this._http.get<OwnerEntity[]>(this.usersUrl);
  }

  getOwnerById(id: number): Observable<OwnerEntity> {
    return this._http.get<OwnerEntity>(`${this.usersUrl}/${id}`)
  }

  updateOwner(
    user: OwnerEntity
  ): Observable<any> {
    console.log(user);
    return this._http.put<any>(this.usersUrl, user, crudOptions)
  }

  generateId(users: OwnerEntity[]): number {
    return users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 11;
  }
}
