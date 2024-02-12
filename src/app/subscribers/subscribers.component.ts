import { Component, OnInit } from '@angular/core';
import { SubsService } from '../services/subs.service';

@Component({
  selector: 'app-subscribers',
  templateUrl: './subscribers.component.html',
  styleUrls: ['./subscribers.component.css']
})
export class SubscribersComponent implements OnInit {

  subs:Array<any>=[];
  ngOnInit(): void {
    this.service.loadData().subscribe(
      (val) =>{
        this.subs=val;
      }
    )
  }

  constructor(private service :SubsService){}
  onDelete(arg0: any) {
  this.service.deleteData(arg0);
    }

}
