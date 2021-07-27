import { Component, OnInit } from '@angular/core';
import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations';
import { DataService } from '../data.service';
import {formatDate} from '@angular/common';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [

    trigger('goals', [
      transition('* => *', [
        query(':enter', style({ opacity: 0 }), { optional: true }),

        query(':enter', stagger('300ms', [
          animate('.6s ease-in', keyframes([
            style({ opacity: 0, transform: 'translateY(-75%)', offset: 0 }),
            style({ opacity: .5, transform: 'translateY(35px)', offset: .3 }),
            style({ opacity: 1, transform: 'translateY(0)', offset: 1 }),
          ]))]), { optional: true }),

        query(':leave', stagger('300ms', [
          animate('.6s ease-in', keyframes([
            style({ opacity: 1, transform: 'translateY(0)', offset: 0 }),
            style({ opacity: .5, transform: 'translateY(35px)', offset: .3 }),
            style({ opacity: 0, transform: 'translateY(-75%)', offset: 1 }),
          ]))]), { optional: true }),
      ])
    ])

  ]
})
export class HomeComponent implements OnInit {

  itemCount: Number = 4;
  currentDate: number = Date.now();
  btnText: string = 'Add a Note';
  goalText: string = '';
  //goals = [{currentDate, goalText}];
  goals : string[] = [];
  showTaskExists: boolean = false;
  showNoTask: boolean = true;
  //byDate : object[] = ;

  constructor(private _data: DataService) { }
    
  ngOnInit() {
    this.itemCount = this.goals.length;
    this._data.goal.subscribe((res : any) => this.goals = res);
    this._data.changeGoal(this.goals);
  }

  addItem() {
    if (this.goalText != ""){
      this.switchPanels();
      this.goals.push(this.goalText);
      this.goalText = "";
      this.itemCount = this.goals.length;
      this._data.changeGoal(this.goals);
    }
    
  }

  removeItem(i : any) {
    this.goals.splice(i, 1);
    this._data.changeGoal(this.goals);
    this.itemCount = this.goals.length;
    this.switchPanels();
  }

  removeAll(){
    if(this.itemCount != 0){
      this.goals.length = 0;
      this._data.changeGoal(this.goals);
      this.itemCount = this.goals.length;
      this.switchPanels();

      // const element = <HTMLElement> document.getElementById('dataPanel');
      // element.style.visibility = "hidden";
    }
  }

  switchPanels(){
    if (this.itemCount == 0){
      this.showNoTask = ! this.showNoTask;
      this.showTaskExists= ! this.showTaskExists;
    }
  }
  
}