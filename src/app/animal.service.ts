import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnimalService {
  animals = ['tortoise', 'gecko', 'spider', 'snake', 'frog'];

  getAnimals(): string[] {
    return this.animals;
  }

  getAnimal(id: number) {
    return this.animals[id];
  }
}
