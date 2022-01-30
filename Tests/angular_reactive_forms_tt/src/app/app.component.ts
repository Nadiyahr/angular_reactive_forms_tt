import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { UserService } from './user.service';
import { OwnerEntity } from './owner';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  titlePerson = 'Form Controls';
  users: OwnerEntity[] = [];
  userCarsControl!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private _userService: UserService,
  ) { }

  ngOnInit(): void {
    this._userService.getgetOwners()
    .subscribe(data => this.users = data);
    this.userCarsControl = this.formBuilder.group({
      user: new FormGroup({
        firstName: new FormControl(),
        lastName: new FormControl(),
        middleName: new FormControl(),
      }),
      cars: new FormArray([
        new FormControl(),
        new FormControl(),
        new FormControl(),
        new FormControl(),
      ])
    })
    this.userCarsControl.valueChanges.subscribe((value) => console.log(value));
  }
}
