import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable()

export class DataService {

  private goals = new BehaviorSubject<any>([]);
  goal = this.goals.asObservable();

  constructor() { }

  changeGoal(goal : any) {
    this.goals.next(goal);
    
  }

}