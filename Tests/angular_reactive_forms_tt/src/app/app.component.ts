import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { CarEntity, OwnerEntity } from './owner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  titleList = 'Владельцы aвтомобилей';
  users: OwnerEntity[] = [];
  user?: OwnerEntity;
  cars?: CarEntity[];
  aId: number;

  constructor(
    private _userService: UserService,
  ) { }

  ngOnInit(): void {
    this._userService.getgetOwners()
    .subscribe(data => {
      this.users = data;
    });
  }

  getIndex(user: OwnerEntity) {
    this.user = user;
    this.cars = user.cars
  }
}
