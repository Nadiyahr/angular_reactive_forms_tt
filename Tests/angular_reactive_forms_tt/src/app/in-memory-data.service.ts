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
        firstName: 'Петрова',
        lastName: 'Наталья',
        middleName: 'Игориевна',
        cars: [
          { number: 'XP1234PH', brand: 'KIA', model: 'Optima', year: 2019},
          { number: 'BC1236AE', brand: 'Hundai', model: 'Accent', year: 2009}
        ]
      },
      {
        id: 12,
        firstName: 'Козлова',
        lastName: 'Ольга',
        middleName: 'Петровна',
        cars: [
          { number: 'XP1234PH', brand: 'KIA', model: 'Optima', year: 2019},
          { number: 'BC1236AE', brand: 'Hundai', model: 'Accent', year: 2009}
        ]
      }
    ]
  
    return {users};
  }

  generateId(users: OwnerEntity[]): number {
    return users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 11;
  }
}
