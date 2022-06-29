import { Component, NgZone, OnInit } from '@angular/core';
import { any } from 'codelyzer/util/function';
import { Friend } from 'src/app/shared/models/friend.model';
import { ChatServiceService } from 'src/app/shared/services/chat-service.service';
import { FriendService } from 'src/app/shared/services/friend.service';
import { Message } from '../../shared/models/message.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  title = 'ClientApp';
  txtMessage: string = '';
  uniqueID: string = '';
  messages = new Array<Message>();
  message = new Message();
  chatDisplay: boolean = false;
  friends: any;
  listFriends: Friend[] = [];
  clientId: any;
  valueSelectFriend: string;
  stateChat: boolean = false;
  constructor(
    private chatService: ChatServiceService,
    private friendService: FriendService,
    private _ngZone: NgZone
  ) {
    this.clientId = localStorage.getItem('currentUser')
      ? JSON.parse(localStorage.getItem('currentUser') || '')
      : [];
    this.uniqueID = this.clientId.user;
    this.subscribeToEvents();
  }
  handleInput(event: any) {
    this.txtMessage = event.target!.value;
  }
  ngOnInit(): void {
    this.friendService.getFriend(this.clientId.idAccount).subscribe((res:any) =>
    {
      debugger
      this.friends = res;
      this.friends.result.forEach((data: any) =>
        {
          if(data.friend.idAccount == this.clientId.idAccount)
          this.listFriends.push(data.friend);
        });
    });
  }

  getSourceMessage()
  {
    this.chatService.getSourceMessage(this.uniqueID,this.valueSelectFriend).subscribe((data :any) =>
      {
        data.forEach((obj:Message) => {
          debugger
          if(obj.clientuniqueid == this.clientId.user)
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
    debugger;
    if (this.txtMessage) {
      this.message = new Message();
      this.message.clientuniqueid = this.uniqueID;
      this.message.type = 'sent';
      this.message.message = this.txtMessage;
      this.message.date = new Date();
      this.message.clientTo = this.valueSelectFriend;
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
        debugger;
        if (message.clientTo === this.uniqueID) {
          debugger;
          message.type = 'received';
          this.messages.push(message);
        }
      });
    });
  }
}
