import { Component, EventEmitter, Input, NgZone, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { any } from 'codelyzer/util/function';
import { CallRequest } from 'src/app/shared/models/callRequest.model';
import { Connect } from 'src/app/shared/models/connect';
import { Friend } from 'src/app/shared/models/friend.model';
import { Notify } from 'src/app/shared/models/notify.model';
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
export class ChatComponent implements OnInit{
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
    private _ngZone: NgZone,
    private router: Router,
  ) {
    this.clientId = localStorage.getItem('currentUser')
      ? JSON.parse(localStorage.getItem('currentUser') || '')
      : [];
    this.uniqueID = this.clientId.idAccount;
    this.connect.idAccount = this.uniqueID;
    this.connect.userName = this.clientId.user;
    this.subscribeToEvents();
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

  call(e: any)
  {
    let fromUser: Profile = new Profile();
    this.profileService.detailsProfile(this.clientId.idAccount).subscribe((data: any) => {
      fromUser = data;
      let callRequest: CallRequest = new CallRequest();
    callRequest.fromUser = fromUser;
    callRequest.toUser = this.profile.idAccount;
    callRequest.roomName = fromUser.idAccount+callRequest.toUser;
    debugger
    this.chatService.call(callRequest);
      this.router.navigate(['/call-user'], { queryParams: { name: callRequest.roomName } }).then(() => {
      });
    });
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
      debugger
      this.message.date = new Date(new Date().toLocaleString());
      this.message.clientTo = this.id;
      this.messages.push(this.message);
      let notify = new Notify();
      notify.idAccount = this.uniqueID;
      notify.idfromTo = this.id;
      notify.date = new Date(new Date().toLocaleString());
      notify.message = `${this.clientId.user} send message to you at ${notify.date.toLocaleString()}`;
      this.chatService.sendNotify(notify);
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
          this.chatService.playAudio();
        }
      });
    });
  }

}
