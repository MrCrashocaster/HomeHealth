import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {
  title = '';
  place = '';
  date = '';
  startTime = '';
  endTime = ''; 
  event = [];
  
  constructor(private alertCtrl : AlertController) { }

  
  async createEvent() {
   //create a prompt alert
   let alert = await this.alertCtrl.create({
     header: "Create Event", 
       inputs: [
       {
         name: 'title',
         placeholder: 'name of event',
         type: 'date'
         
       },
       {
         name: 'place', 
         placeholder: 'location of event',
         type: 'date'
       },
       {
         name: 'date', 
         placeholder: 'DD/MM/YYYY', 
         type: 'date'
       },
       {
         name: 'startTime',
         placeholder: 'start time of event (24hr)',
         type: 'date'
       },
       {
         name: 'endTime',
         placeholder: 'end time of event (24hr)',
         type: 'date'
       }
     ],
   })
   alert.present(); 
   this.eventConstructor(this.title, this.place, this.date, this.startTime, this.endTime)
  }

  eventConstructor(title, place, date, startTime, endTime) {
    this.event = [[this.title, this.place, this.date, this.startTime, this.endTime]]

  }
  ngOnInit(): void{
  }

  onChange($event) {
    console.log($event);
  }
}
