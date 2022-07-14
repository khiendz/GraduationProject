import { Component, EventEmitter, Input, NgZone, OnDestroy, OnInit, Output } from '@angular/core';
import { any } from 'codelyzer/util/function';
import { Connect } from 'src/app/shared/models/connect';
import { Friend } from 'src/app/shared/models/friend.model';
import { Profile } from 'src/app/shared/models/profile.model';
import { ChatServiceService } from 'src/app/shared/services/chat-service.service';
import { FriendService } from 'src/app/shared/services/friend.service';
import { ProfileService } from 'src/app/shared/services/profile.service';
import { Message } from '../../shared/models/message.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, OnDestroy{
  title = 'ClientApp';
  txtMessage: string = '';
  @Input('id') id:string = '';
  @Input('listIds') listIds:string[] = [];
  @Output() listId = new EventEmitter<any>();
  uniqueID: string = '';
  messages = new Array<Message>();
  message = new Message();
  chatDisplay: boolean = false;
  friends: any;
  listFriends: Friend[] = [];
  clientId: any;
  valueSelectFriend: string;
  stateChat: boolean = false;
  profile: Profile = new Profile();
  enableClose: boolean = false;
  avatar: string = '';
  connect: Connect = new Connect();
  constructor(
    private chatService: ChatServiceService,
    private friendService: FriendService,
    private profileService: ProfileService,
    private _ngZone: NgZone
  ) {
    this.clientId = localStorage.getItem('currentUser')
      ? JSON.parse(localStorage.getItem('currentUser') || '')
      : [];
    this.uniqueID = this.clientId.idAccount;
    this.connect.idAccount = this.uniqueID;
    this.connect.userName = this.clientId.user;
    this.subscribeToEvents();
  }
  ngOnDestroy(): void {
    this.chatService._disconnect(this.connect);
    this.chatService._hubConnection.stop();
  }
  handleInput(event: any) {
    this.txtMessage = event.target!.value;
  }
  ngOnInit(): void {
    // this.friendService.getFriend(this.clientId.idAccount).subscribe((res:any) =>
    // {
    //   debugger
    //   this.friends = res;
    //   this.friends.result.forEach((data: any) =>
    //     {
    //       if(data.friend.idAccount == this.clientId.idAccount)
    //       this.listFriends.push(data.friend);
    //       this.listProfile.push(data.profile);
    //     });
    // });
    this.profileService.detailsProfile(this.id).subscribe((data: any) => {
      this.profile = data;
      this.avatar = this.profile.avatar;
    });
    this.getSourceMessage();
    this.chatService.connect(this.connect);
  }

  close()
  {
    this.chatDisplay = !this.chatDisplay;
    let index = this.listIds.findIndex(data => data == this.id);
    this.listIds.splice(index,1);
    this.listId.emit(this.listIds);
  }

  minimum()
  {
    this.chatDisplay = !this.chatDisplay;
  }

  focus()
  {
    this.enableClose = !this.enableClose;
  }

  getSourceMessage()
  {
    this.chatService.getSourceMessage(this.uniqueID,this.id).subscribe((data :any) =>
      {
        data.forEach((obj:Message) => {
          if(obj.clientuniqueid == this.uniqueID)
          {
            this.messages.push(obj);
          }else
          {
            obj.type = 'received';
            this.messages.push(obj);
          }
        });
      });
  }

  sendMessage(): void {
    if (this.txtMessage) {
      this.message = new Message();
      this.message.clientuniqueid = this.uniqueID;
      this.message.type = 'sent';
      this.message.message = this.txtMessage;
      this.message.date = new Date();
      this.message.clientTo = this.id;
      this.messages.push(this.message);
      this.chatService.sendMessage(this.message);
      this.txtMessage = '';
    }
  }

  selectFriend()
  {
    this.getSourceMessage();
  }
  private subscribeToEvents(): void {
    if (this.uniqueID == '') {
      return;
    }
    this.chatService.messageReceived.subscribe((message: Message) => {
      this._ngZone.run(() => {
        if (message.clientTo === this.uniqueID) {
          message.type = 'received';
          this.messages.push(message);
        }
      });
    });
  }
}
