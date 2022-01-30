import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OwnerEntity } from './owner';
import { Observable } from 'rxjs';

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
}
