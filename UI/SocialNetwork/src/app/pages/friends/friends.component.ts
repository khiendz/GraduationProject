import { Component, NgZone, OnInit } from '@angular/core';
import { any } from 'codelyzer/util/function';
import { Friend } from 'src/app/shared/models/friend.model';
import { FriendService } from 'src/app/shared/services/friend.service';
import { Message } from '../../shared/models/message.model';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent implements OnInit {

  events: Array<string> = [];
  dataSource: any[] = [];

  constructor(    private friendService: FriendService ) {

  }

  logEvent(eventName: any) {
    this.events.unshift(eventName);
  }

  addFriend()
  {

  }

  ngOnInit(): void {
  }

}
