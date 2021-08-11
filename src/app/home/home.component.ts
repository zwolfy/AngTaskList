import { Component, OnInit } from '@angular/core';
import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations';
import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [

    trigger('notes', [
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

  itemCount: Number = 0;
  btnText: string = 'Add a Note';
  goalText: string = '';
  groupDates = [];
  dateNow: string = '';
  Notes:  NoteData[]=[];
  dateArr: any[]=[];;

  constructor(private _data: DataService) { }
    
  ngOnInit() {
    this.itemCount = this.Notes.length;
  }

  addItem() {
    if(this.goalText!= ''){
      this.dateNow = this.getDate(Date.now());
      let noteObject: NoteData = {note: this.goalText, date: this.dateNow};
      this.Notes.push(noteObject);
      this.groupDates = this.groupBy(this.Notes, "date");
      this.dateArr = [...new Set(this.Notes.map(x => x.date))];
      this.goalText = "";
      this.itemCount = this.Notes.length;

    };
    
  }

  removeItem(i : any) {
    this.Notes.splice(i, 1);
    this.groupDates = this.groupBy(this.Notes, "date");
    this.itemCount = this.Notes.length;
  }

  removeAll(){
    if(this.itemCount != 0){
      this.Notes = [];
      this.groupDates = [];
      this.itemCount = this.Notes.length;
    }
  }

 groupBy = function(data: any, key: any) { 
    return data.reduce(function(storage: any, item:any) {
      var group = item[key];
      storage[group] = storage[group] || [];
      storage[group].push(item); 
      return storage; 
    }, {}); 
  };

  getDate(date:any){
    return new Intl.DateTimeFormat('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }).format(date);
  }
}

interface NoteData {
  note: string, 
  date: string
}

