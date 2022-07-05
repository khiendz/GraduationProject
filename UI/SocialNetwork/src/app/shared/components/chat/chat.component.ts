import { Component, Input, NgModule, NgZone, OnInit } from '@angular/core';
import { ChatServiceService } from 'src/app/shared/services/chat-service.service';
import { Message } from '../../models/message.model';

@Component({
  selector: 'app-chats',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatsComponent implements OnInit {
  @Input('id') id: string = '';
  title = 'ClientApp';
  txtMessage: string = '';
  uniqueID: string = new Date().getTime().toString();
  messages = new Array<Message>();
  message = new Message();
  @Input('listId') listId:string[] = [];
  constructor(
    private chatService: ChatServiceService,
    private _ngZone: NgZone
  ) {
    this.subscribeToEvents();
  }
  handleInput(event: any) {
    this.txtMessage = event.target!.value;
 }
  ngOnInit(): void {

  }
  sendMessage(): void {
    debugger
    if (this.txtMessage) {
      this.message = new Message();
      this.message.clientuniqueid = this.uniqueID;
      this.message.type = "sent";
      this.message.message = this.txtMessage;
      this.message.date = new Date();
      this.messages.push(this.message);
      this.chatService.sendMessage(this.message);
      this.txtMessage = '';
    }
  }
  private subscribeToEvents(): void {

    this.chatService.messageReceived.subscribe((message: Message) => {
      this._ngZone.run(() => {
        if (message.clientuniqueid !== this.uniqueID) {
          message.type = "received";
          this.messages.push(message);
        }
      });
    });
  }

}
@NgModule({
  imports: [
  ],
  declarations: [ ChatsComponent ],
  exports: [ ChatsComponent ]
})
export class ChatsModule { }
