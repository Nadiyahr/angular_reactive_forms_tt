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
  selectedUser?: OwnerEntity;
  cars?: CarEntity[];
  isSelect: boolean = false;
  isUpdated: boolean = false;
  selectedIndex: number;
  aId: number;

  constructor(
    private _userService: UserService,
  ) { }

  ngOnInit(): void {
    this._userService.getOwners()
    .subscribe(data => {
      this.users = data;
    });
  }

  addUser() {

  }

  getIndex(user: OwnerEntity, index: number) {
    this.selectedUser = user;
    this.cars = user.cars;
    this.selectedIndex = index;
  }

  toggle(): void {
    console.log(this.isSelect);
    this.isSelect = !this.isSelect;
    console.log(this.isSelect);
  }

  userSelected(): void {
    if (this.selectedUser) {
      this.toggle();
    } else {
      return;
    }
  }

  isListUpdate(): void {
    this.isUpdated = !this.isUpdated;
    console.log(this.isUpdated);
    if (this.isUpdated) {
      this.saveUserUpdate();
    }
  }

  saveUserUpdate() {
    this._userService.getOwners()
    .subscribe(data => {
      this.users = data;
    });
  }
  
}
