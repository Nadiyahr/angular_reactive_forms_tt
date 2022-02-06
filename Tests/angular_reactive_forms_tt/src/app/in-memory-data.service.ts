import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

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
          { userId: 11, number: 'XP1234PH', brand: 'KIA', model: 'Optima', year: 2019},
          { userId: 11, number: 'BC1236AE', brand: 'Hundai', model: 'Accent', year: 2009}
        ]
      },
      {
        id: 12,
        firstName: 'Козлова',
        lastName: 'Ольга',
        middleName: 'Петровна',
        cars: [
          { userId: 12, number: 'XP1234PH', brand: 'KIA', model: 'Optima', year: 2019},
          { userId: 12, number: 'BC1236AE', brand: 'Hundai', model: 'Accent', year: 2009}
        ]
      }
    ]
  
    return {users};
  }
}
