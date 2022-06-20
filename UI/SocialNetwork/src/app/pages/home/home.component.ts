import { Component, OnInit } from '@angular/core';
import { NewsFeed } from 'src/app/shared/models/newsFeed.model';
import { HomeService } from './home.service';
import { lastValueFrom } from 'rxjs';

@Component({
  templateUrl: 'home.component.html',
  styleUrls: [ './home.component.scss' ]
})

export class HomeComponent implements OnInit{
  isMultiline: boolean = true;
  valueContent: string;
  stateEditNewsFeed: boolean = false;
  listNewsFeed: NewsFeed[] = [];
  result: any;
  title: string;

  constructor(public service:HomeService)
  {
  }

  async ngOnInit()
  {
    await Promise.all([
      this.GetALL(),
    ]);
  }

  async GetALL()
  {
    debugger
    this.listNewsFeed = await lastValueFrom(
      this.service.GetAll()
    );
  }

  async Create()
  {
    let newFeed: NewsFeed = new NewsFeed();
    newFeed.content = this.valueContent;
    let today = new Date();
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime = date+' '+time;
    newFeed.datetimePost = new Date(dateTime);
    newFeed.idAccount = "1";
    this.result = await lastValueFrom(
      this.service.Create(newFeed)
    );
    if(this.result)
    {
      window.location.reload();
    }
  }

  editNewsFeed(e:any)
  {
    this.stateEditNewsFeed = !this.stateEditNewsFeed;
  }
}
