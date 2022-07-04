import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import {
  DxButtonModule,
  DxFilterBuilderModule,
  DxListModule,
  DxTextBoxModule,
  DxToolbarModule,
} from 'devextreme-angular';
import { Friend } from '../../models/friend.model';
import { Profile } from '../../models/profile.model';
import { ChatServiceService } from '../../services/chat-service.service';
import { FriendService } from '../../services/friend.service';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-list-friend',
  templateUrl: './list-friend.component.html',
  styleUrls: ['./list-friend.component.scss'],
})
export class ListFriendComponent implements OnInit {
  friends: any;
  friendSource: Friend[] = [];
  listFriends: Friend[] = [];
  listProfile: Profile[] = [];
  profileSource: any[] = [];
  profile: Profile;
  clientId: any;
  constructor(
    private chatService: ChatServiceService,
    private friendService: FriendService,
    public profileService: ProfileService
  ) {
    this.clientId = localStorage.getItem('currentUser')
      ? JSON.parse(localStorage.getItem('currentUser') || '')
      : [];
  }
  ngOnInit(): void {
    this.friendService
      .getFriend(this.clientId.idAccount)
      .subscribe((res: any) => {
        this.friends = res;
        this.friends.result.forEach((data: any) => {
          this.listFriends.push(data.friend);
          this.listProfile.push(data.profile);
        });
      });

    this.profileService.getList().subscribe((data: any) => {
      this.profileSource = data.filter(
        (obj: Profile) => (obj.idAccount != this.clientId.idAccount)
      );
    });

  }
}
@NgModule({
  imports: [
    CommonModule,
    DxButtonModule,
    DxToolbarModule,
    DxListModule,
    DxFilterBuilderModule,
    DxTextBoxModule,
  ],
  declarations: [ListFriendComponent],
  exports: [ListFriendComponent],
})
export class ListFriendModule {}
