import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  NgModule,
  NgZone,
  OnInit,
  Output,
} from '@angular/core';
import {
  DxButtonModule,
  DxFilterBuilderModule,
  DxListModule,
  DxSelectBoxModule,
  DxTextBoxModule,
  DxToolbarModule,
} from 'devextreme-angular';
import { ChatComponent } from 'src/app/pages/chat/chat.component';
import { Connect } from '../../models/connect';
import { Friend } from '../../models/friend.model';
import { Profile } from '../../models/profile.model';
import { ChatServiceService } from '../../services/chat-service.service';
import { FriendService } from '../../services/friend.service';
import { ProfileService } from '../../services/profile.service';
import { ChatsModule } from '../chat/chat.component';

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
  listIdSource: string[] = [];
  uniqueID: string = '';
  connect: Connect = new Connect();
  listConnect: Connect[] = [];
  @Output() listId = new EventEmitter<any>();
  constructor(
    private chatService: ChatServiceService,
    private friendService: FriendService,
    public profileService: ProfileService,
    private _ngZone: NgZone
  ) {
    this.clientId = localStorage.getItem('currentUser')
      ? JSON.parse(localStorage.getItem('currentUser') || '')
      : [];
    this.uniqueID = this.clientId.idAccount;
    this.connect.idAccount = this.uniqueID;
    this.connect.userName = this.clientId.user;
    this.subscribeToEvents();
    this.chatService.connect(this.connect);
    window.addEventListener('beforeunload', () => {
      debugger
      this.chatService._disconnect(this.connect);
  });
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
        (obj: Profile) => obj.idAccount != this.clientId.idAccount
      );
    });
  }

  selectFriend(e: any) {
    if (!this.listIdSource.find((data: any) => data == e.idAccount)) {
      this.listIdSource.push(e.idAccount);
      this.listId.emit(this.listIdSource);
    }
  }

  connectOnline()
  {
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
        (obj: Profile) => obj.idAccount != this.clientId.idAccount
      );
    });
  }

  private subscribeToEvents(): void {
    if (this.uniqueID == '') {
      return;
    }
    this.chatService.connectStart.subscribe((connect: any) => {
      debugger
      this._ngZone.run(() => {
        debugger;
        this.listConnect = connect;
        debugger;
        this.connectOnline();
      });
    });

    this.chatService.disconnect.subscribe((connect: any) => {
      this._ngZone.run(() => {
        this.listConnect = connect;
        debugger;
      });
    });
  }

  checkConnect(id: string)
  {
    if(this.listConnect.filter(connect => connect.idAccount == id))
    return false;
    return true;
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
    ChatsModule,
    DxSelectBoxModule,
  ],
  declarations: [ListFriendComponent],
  exports: [ListFriendComponent],
})
export class ListFriendModule {}
