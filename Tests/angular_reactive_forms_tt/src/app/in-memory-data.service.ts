import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  createDb() {
    let users = [
      {
        id: 1,
        firstName: 'Jhon',
        lastName: 'Smith',
        middleName: 'Aleksandrovith',
        cars: [
          { plate: 'XP1234PH', brand: 'KIA', model: 'Optima', year: 2019},
          { plate: 'BC1236AE', brand: 'Hundai', model: 'Accent', year: 2009}
        ]
      }
    ]
  
    return {users};
  }
}
