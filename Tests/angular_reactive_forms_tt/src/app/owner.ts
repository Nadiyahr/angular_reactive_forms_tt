export type CarEntity = {
  userId: number;
  plate: string;
  brand: string;
  model: string;
  year: number;
}

export interface OwnerEntity {
  id: number;
  firstName: string;
  lastName: string;
  middleName: string;
  cars: CarEntity[]
}
