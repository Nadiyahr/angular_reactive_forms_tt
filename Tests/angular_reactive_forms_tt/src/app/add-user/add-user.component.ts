import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
// import { UserService } from '../user.service';
import { CarEntity, OwnerEntity } from '../owner';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})

export class AddUserComponent implements OnInit {
  userCarsControl: FormGroup;
  // carsControl: FormArray;
  // cardGroup: FormGroup;
  @Input() user?: OwnerEntity;
  @Input() cars?: CarEntity[]
  constructor(
    private formBuilder: FormBuilder,
  ) { 
  }
  

  ngOnInit(): void {
    // console.log(this.cars)

    this.userCarsControl = this.formBuilder.group({
      lastName: new FormControl(this.user?.lastName),
      firstName: new FormControl(this.user?.firstName),
      middleName: new FormControl(this.user?.middleName),
      carsControl: this.formBuilder.array(this.setCars())
    })

    console.log(this.setCars());
    

    this.userCarsControl.valueChanges.subscribe((value) => console.log(value));
  }

  get carsControl() {
    return this.userCarsControl.get('carsControl') as FormArray;
  }

  setCars() {
    if (this.cars) {
      return this.cars.map(car => car);
    } else {
      return []
    }
    // const carsFormArray = this.formBuilder.array(carsArray ? carsArray : []);
    // this.userCarsControl.setControl('carsControl', carsFormArray);
  }

  // createCar() {
  //   this.userCarsControl = this.formBuilder.group({
  //     lastName: '',
  //     firstName: '',
  //     middleName: '',
  //     carsControl: this.formBuilder.array([])
  //   })
  // }

  


  createCar(item?: CarEntity): FormGroup {
    // this.carsControl = this.userCarsControl.get('carsControl') as FormArray;
    return this.formBuilder.group({
      plate: new FormControl(item?.plate),
      brand: new FormControl(item?.brand),
      model: new FormControl(item?.model),
      year: new FormControl(item?.year),
    });
  }

  // addCar(item?: CarEntity): void {
  //   // this.carsControl = this.userCarsControl.get('carsControl') as FormArray;
  //   this.carsControl.push(this.createCar(item))
  // }
}
