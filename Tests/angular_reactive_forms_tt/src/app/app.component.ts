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
  selectedIndex: number | null;
  isIndex: boolean = false;
  aId: number;
  numbersArray: string[];

  constructor(
    private _userService: UserService,
  ) { }

  ngOnInit(): void {
    this.getData();
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
    if (!this.isSelected) {
      this.selectedIndex = null;
    }
  }

  readOnlyViev() {
    if (this.selectedUser) {
      this.isReadOnly = !this.isReadOnly;
      this.toggle();
    } else {
      return;
    }
  }

  userSelected(): void {
    if (this.selectedUser) {
      this.numbersArray = this.users.map(user => user.cars.map(car => car.number)).flat();
      this.toggle();
    } else {
      return;
    }
  }

  deleteUser(id: number): void {
    this._userService.deleteOwner(id)
      .subscribe();
    this.getData();

  }

  isListUpdate(): void {
    this.isUpdated = !this.isUpdated;
    if (this.isUpdated) {
      this._userService.updateOwner(this.selectedUser, this.selectedUser.id)
        .subscribe()
      this.getData();
    }
  }

  getData() {
    this._userService.getOwners()
    .subscribe(data => {
      this.users = data;
    });
  }

  // getNumbersForValidation(): void {
  //   this.numbersArray = 
  // }

}
