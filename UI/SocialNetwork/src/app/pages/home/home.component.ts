import { Component, Input, OnInit } from '@angular/core';
import { NewsFeed, NewsFeedEntity } from 'src/app/shared/models/newsFeed.model';
import { HomeService } from './home.service';
import { EMPTY, lastValueFrom } from 'rxjs';
import { Profile } from 'src/app/shared/models/profile.model';
import notify from 'devextreme/ui/notify';
import { Route, Router, RouterLinkActive } from '@angular/router';
import { RouteAddedEvent } from 'devextreme/ui/map';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: [ './home.component.scss' ]
})

export class HomeComponent implements OnInit{
  isMultiline: boolean = true;
  valueContent: string;
  stateEditNewsFeed: boolean = false;
  listNewsFeed: NewsFeed[] = [];
  listEntity: NewsFeedEntity[] = [];
  listProfile: Profile[] = [];
  result: any;
  title: string;
  clientId : any;
  uniqueID : any;
  idProfile: any;
  stateCheck : boolean = true;
  @Input('id') id: string = '';
  @Input('name') name: string = '';

  profileSettings: any[] = [
    { value: 1, name: 'Profile', icon: 'user' },
    {
      value: 4, name: 'Edit', icon: 'edit',
    },
    { value: 2, name: 'Delete', icon: 'trash' }
  ];


  constructor(public service:HomeService, private router: Router)
  {
    this.clientId = localStorage.getItem('currentUser')
    ? JSON.parse(localStorage.getItem('currentUser') || '')
    : [];
    this.uniqueID = this.clientId.user;
  }

  async ngOnInit()
  {
    this.idProfile = this.clientId.idAccount;
    setTimeout(async () => {
      if(this.id)
      {
        this.idProfile = this.id;
        this.stateCheck = !this.stateCheck;
        document.getElementById('editHtml')?.setAttribute("style","display: none");
      }
      await Promise.all([
        this.GetALL(),
      ]);
    },2000);
  }

  async GetALL()
  {
    if(this.id)
    {
      this.result = await lastValueFrom(
        this.service.GetProfile(this.idProfile)
      );
    }else if(this.name == "profile")
    {
      this.result = await lastValueFrom(
        this.service.GetProfile(this.idProfile)
      );
    }else
    {
      this.result = await lastValueFrom(
        this.service.GetAll(this.idProfile)
      );
    }
    this.result.result.forEach((data: any) => {
      let entityNewFeeds : NewsFeedEntity = new NewsFeedEntity();
      entityNewFeeds.id = data.newFeeds.id;
      entityNewFeeds.content = data.newFeeds.content;
      entityNewFeeds.datetimePost = data.newFeeds.datetimePost;
      entityNewFeeds.idAccount = data.newFeeds.idAccount;
      entityNewFeeds.avatar = data.profile.avatar;
      entityNewFeeds.name = data.profile.name;
      this.listEntity.push(entityNewFeeds);
    });

    this.listEntity;
  }

  onItemClick(e: any, data: any)
  {
    if(e.itemData.name == "Edit")
    {
      if(data.idAccount == this.idProfile)
      {
        this.stateEditNewsFeed = !this.stateEditNewsFeed;
        this.valueContent = data.content;
      }else
      {
        notify("You are not the author","success",3000);
      }

    }else if(e.itemData.name == "Delete")
    {
      if(data.idAccount == this.idProfile)
      {
        this.service.Delete(data.id).subscribe();
      }else
      {
        notify("You are not the author","success",3000);
      }
    }else
    {
      this.router
      .navigate(['/profile'], { queryParams: { name: data.name } })
      .then(() => {
        window.location.reload();
      });
    }
    console.log(e);
    console.log(data);
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
    newFeed.idAccount = this.idProfile;
    newFeed.idAccount = this.idProfile;
    this.result = await lastValueFrom(
      this.service.Create(newFeed)
    );
    if(this.result)
    {
      window.location.reload();
    }
  }

  async Delete(id: string)
  {
    this.result = await lastValueFrom(
      this.service.Delete(id)
    );
    window.location.reload();
    if(this.result)
    {
      window.location.reload();
    }
  }
  back()
  {
    this.stateEditNewsFeed = !this.stateEditNewsFeed;
  }

  editNewsFeed(e:any)
  {
    this.stateEditNewsFeed = !this.stateEditNewsFeed;
  }
}
