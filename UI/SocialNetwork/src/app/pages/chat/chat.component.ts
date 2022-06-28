import { Component, NgZone, OnInit } from '@angular/core';
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
  friends: Friend[] = [];
  clientId: any;
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
      this.friends = res;
      debugger
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
      this.message.clientTo = 'khien';
      this.messages.push(this.message);
      this.chatService.sendMessage(this.message);
      this.txtMessage = '';
    }
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
