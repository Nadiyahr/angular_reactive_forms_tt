import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { OwnerEntity } from './owner';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  createDb() {
    let users = [
      {
        id: 11,
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

  generateId(users: OwnerEntity[]): number {
    return users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 11;
  }
}
