import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { 
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators 
} from '@angular/forms';
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
  @Input() cars: CarEntity[];
  @Input() isSelected: boolean = false;
  @Input() isUpdated: boolean;
  @Input() isReadOnly: boolean;
  @Input() arrayOfNumbers: string[];
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
      lastName: new FormControl(this.user?.lastName, [
        Validators.required,
        Validators.pattern("^[А-Я][а-я]{1,20}$")
      ]),
      firstName: new FormControl(this.user?.firstName, [
        Validators.required,
        Validators.pattern("^[А-Я][а-я]+$")
      ]),
      middleName: new FormControl(this.user?.middleName ,[
        Validators.required,
        Validators.pattern("^[А-Я][а-я]+$")
      ]),
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
          userId: new FormControl(car.userId),
          number: new FormControl(car.number,  [
            Validators.required,
            Validators.pattern("^[A-Z]{2}[0-9]{4}[A-Z]{2}$"),
            this.carNumberValidator()
          ]),
          brand: new FormControl(car.brand, [Validators.required, Validators.pattern("^[A-Z].*$")]),
          model: new FormControl(car.model, [Validators.required, Validators.pattern("^[A-Z].*$")]),
          year: new FormControl(car.year, [
            Validators.required,
            this.minMaxYearForbiden(1990, new Date().getFullYear())
          ]),
        })
      )
    })

    return formArray;
  }

  newCar(): FormGroup {
    return this.formBuilder.group({
      userId: this.user?.id,
      number: ['', [
        Validators.required,
        Validators.pattern("^[A-Z]{2}[0-9]{4}[A-Z]{2}$"),
        this.carNumberValidator()
      ]],
      brand: ['', [Validators.required, Validators.pattern("^[A-Z][a-z]{2,20}$")]],
      model: ['', [Validators.required, Validators.pattern("^[A-Z][a-z]{2,20}$")]],
      year: ['', [
        Validators.required,
        this.minMaxYearForbiden(1990, new Date().getFullYear())
      ]],
    })
  }

  addNewCar(): void {
    this.carsControl.push(this.newCar())
  }

  carNumberValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      let value: string = control.value;

      if (value && this.arrayOfNumbers.includes(value)) {
        return {
          'carNumberValidator': true,
          'dulicatesNumber': {value: value}
        }
      }

      return null;
    }
  }

  minMaxYearForbiden(min: number, max: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      let value: number = +control.value;

      if (value < +min) {
        return {
          'minMaxYearForbiden': true,
          'requiredMinValue': min
        }
      }

      if (value > +max) {
        return {
          'minMaxYearForbiden': true,
          'requiredMaxValue': max
        }
      }
      return null;
    }
  }

  getGroup(e: any) {
    const indx = parseInt(e.target.id);
    this.cars.splice(indx, 1);
    this.userCarsControl.setControl('carsControl', this.setExistingCars(this.cars))
  }

  goBack(): void {
    if (this.isReadOnly) {
      this.readOnlyViev.emit()
    } else {
      this.toggle.emit()
    }
  }

  save(): void {
      this.user.firstName = this.newValue.firstName;
      this.user.lastName = this.newValue.lastName;
      this.user.middleName = this.newValue.middleName;
      this.user!.cars = this.newValue.carsControl
      this._userService.updateOwner(this.user, this.user.id)
      .subscribe(() => {
        this.goBack()
        this.isListUpdate.emit()
      })
  }

    onSubmit() {
    if(this.userCarsControl.valid){
     this.save();
    } else {
      console.log(this.userCarsControl)
    }
  }
}
