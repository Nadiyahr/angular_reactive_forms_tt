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
  @Input() user?: OwnerEntity;
  @Input() cars?: CarEntity[];
  @Input() isSelected: boolean = false;
  @Input() isUpdated: boolean;
  // @Output() userChange = new EventEmitter<OwnerEntity>();
  @Output() toggle = new EventEmitter();
  @Output() isListUpdate = new EventEmitter()

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

    this.userCarsControl.setControl('carsControl', this.setExistingCars(this.cars ? this.cars : []))
    

    this.userCarsControl.valueChanges.subscribe((value) => {
      console.log(value);
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
    console.log('work');
    console.log(this.isSelected);
    this.toggle.emit()
    console.log(this.isSelected);
  }

  save(): void {
    const carsArray = this.userCarsControl.get('carsControl') as FormArray
    console.log(carsArray.value[2]);
    console.log(this.cars?.length);
    const carsLength = this.cars?.length || 0;
    const dif = carsArray.value - carsLength;
    console.log(...carsArray.value.slice(carsLength));
    
    if (this.user && carsLength < carsArray.value.length) {
      this.user?.cars.push(...carsArray.value.slice(carsLength));
      this._userService.updateOwner(this.user)
      .subscribe(() => {
        this.goBack()
      })
    }
  }
}
