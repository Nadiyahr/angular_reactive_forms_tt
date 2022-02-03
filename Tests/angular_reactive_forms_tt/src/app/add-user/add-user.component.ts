import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { CarEntity, OwnerEntity } from '../owner';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})

export class AddUserComponent implements OnInit {
  userCarsControl: FormGroup;
  newValue: any;
  @Input() user!: OwnerEntity;
  @Input() cars!: CarEntity[];
  @Input() isSelected: boolean = false;
  @Input() isUpdated: boolean;
  @Input() isReadOnly: boolean;
  @Output() toggle = new EventEmitter();
  @Output() isListUpdate = new EventEmitter();
  @Output() readOnlyViev = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private _userService: UserService,
  ) { 
  }
  

  ngOnInit(): void {
    this.userCarsControl = this.formBuilder.group({
      id: new FormControl(this.user?.id),
      lastName: new FormControl(this.user?.lastName),
      firstName: new FormControl(this.user?.firstName),
      middleName: new FormControl(this.user?.middleName),
      carsControl: this.formBuilder.array([])
    })

    this.userCarsControl.setControl('carsControl', this.setExistingCars(this.cars))
    

    this.userCarsControl.valueChanges.subscribe((value) => {
      this.newValue = value;
    });
  }
  

  get carsControl() {
    return this.userCarsControl.get('carsControl') as FormArray;
  }

  setExistingCars(cars: CarEntity[]): FormArray {
    const formArray = new FormArray([]);
    cars.forEach(car => {
      formArray.push(
        this.formBuilder.group({
          number: new FormControl(car.number),
          brand: new FormControl(car.brand),
          model: new FormControl(car.model),
          year: new FormControl(car.year),
        })
      )
    })

    return formArray;
  }

  newCar(): FormGroup {
    return this.formBuilder.group({
      userId: this.user?.id,
      number: '',
      brand: '',
      model: '',
      year: '',
    })
  }

  addNewCar(): void {
    this.carsControl.push(this.newCar())
  }

  goBack(): void {
    if (this.isReadOnly) {
      this.readOnlyViev.emit()
    } else {
      this.toggle.emit()
    }
  }

  save(): void {
    const carsArray = this.userCarsControl.get('carsControl') as FormArray
    const carsLength = this.cars?.length || 0;
    if (this.user) {
      this.user.firstName = this.newValue.firstName;
      this.user.lastName = this.newValue.lastName;
      this.user.middleName = this.newValue.middleName;
      this.user?.cars.push(...carsArray.value.slice(carsLength));
      this._userService.updateOwner(this.user, this.user.id)
      .subscribe(() => {
        this.goBack()
        this.isListUpdate.emit()
      })
    }
  }
}
