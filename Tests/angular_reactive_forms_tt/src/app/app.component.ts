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
  selectedUser!: OwnerEntity;
  cars!: CarEntity[];
  isSelected: boolean = false;
  isUpdated: boolean = false;
  isReadOnly: boolean = false
  selectedIndex: number;
  isIndex: boolean = false;
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
    this.selectedUser = {
      id: this._userService.generateId(this.users),
      lastName: '',
      firstName: '',
      middleName: '',
      cars: []
    }

    this.cars = [{
      userId: this._userService.generateId(this.users),
      number: '',
      brand: '',
      model: '',
      year: null,
    }]
    this.toggle()
  }

  getIndex(user: OwnerEntity, index: number) {
    this.selectedUser = user;
    this.cars = user.cars;
    this.selectedIndex = index;
    this.isIndex = true;
  }

  toggle(): void {
    this.isSelected = !this.isSelected;
  }

  readOnlyViev() {
    if (this.selectedUser) {
      this.isReadOnly = !this.isReadOnly;
      this.toggle();
      console.log(this.isReadOnly);
    } else {
      return;
    }
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
      console.log(data);
      this.users = data;
    });
  }

}
