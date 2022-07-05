import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { any } from 'codelyzer/util/function';
import { Friend } from 'src/app/shared/models/friend.model';
import { Profile } from 'src/app/shared/models/profile.model';
import { ChatServiceService } from 'src/app/shared/services/chat-service.service';
import { FriendService } from 'src/app/shared/services/friend.service';
import { ProfileService } from 'src/app/shared/services/profile.service';
import { Message } from '../../shared/models/message.model';

@Component({
  templateUrl: 'tasks.component.html',
  styleUrls: ['./task.component.scss'],
})

export class TasksComponent {
  dataSource: any;
  priority: any[];
  friends: any;
  listFriends: Friend[] = [];
  listProfile: Profile[] = [];
  uniqueID: string = '';
  clientId: any;
  profileSource: any[] = [];
  profile: Profile;
  idAccount: string;
  buttonOptions: any = {
    text: 'Register',
    type: 'success',
    useSubmitBehavior: true,
  };

  constructor( private friendService: FriendService, public profileService: ProfileService, public router: Router ) {
    this.clientId = localStorage.getItem('currentUser')
    ? JSON.parse(localStorage.getItem('currentUser') || '')
    : [];
  this.uniqueID = this.clientId.user;
  }

  ngOnInit(): void {
    this.friendService.getFriend(this.clientId.idAccount).subscribe((res:any) =>
    {
      this.friends = res;
      this.friends.result.forEach((data: any) =>
        {
          this.listFriends.push(data.friend);
          this.listProfile.push(data.profile);
        });

    });

    this.profileService.getList().subscribe((data: any) => {
      this.profileSource = data.filter((obj: Profile) => obj.idAccount != this.clientId.idAccount);
    });
  }

  checkAdded(e: any)
  {
    if(this.listFriends.find(obj => obj.idFriend == e.data.idAccount))
    return false;
    return true;
  }

  async addFriend(e: any)
  {
    let _friend = new Friend();
    let profile = this.profileSource.find(data => data.idAccount == e.data.idAccount);
    _friend.idAccount = this.clientId.idAccount;
    _friend.idFriend = profile?.idAccount ?? '';
    _friend.name = profile?.name ?? '';
    await this.friendService.addFriend(_friend).subscribe(data =>
      {
        this.reloadDataSource();
      },(error: any) => {
        this.reloadDataSource();
      });
  }

  reloadDataSource()
  {
    this.friendService.getFriend(this.clientId.idAccount).subscribe((res:any) =>
    {
      this.friends = res;
      this.friends.result.forEach((data: any) =>
        {
          this.listFriends.push(data.friend);
          this.listProfile.push(data.profile);
        });
    });

    this.profileService.getList().subscribe((data: any) => {
      this.profileSource = data.filter((obj: Profile) => obj.idAccount != this.clientId.idAccount);
    });
  }

  async deleteFriend(e: any)
  {
    await this.friendService.deleteFriend(this.clientId.idAccount,e.data.idAccount).subscribe(data =>
      {
        window.location.reload();
      },(error: any) => {
        window.location.reload();
      });
  }

  selectProfile()
  {
    this.profile = new Profile();
    this.profileSource.forEach((data: Profile) => {
      if(data.idAccount == this.idAccount)
      {
        this.profile = data;
        return;
      }
    });
  }

  submitForm()
  {
    this.profile = this.profileSource[0];
  }
}
