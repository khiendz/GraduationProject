import { Component, OnInit } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { HubConnection } from '@microsoft/signalr';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  private _hubConnection: HubConnection | undefined;
  public async: any;
  message = '';
  messages: string[] = [];

  constructor() {
  }

  public sendMessage(): void {
      const data = `Sent: ${this.message}`;

      if (this._hubConnection) {
          this._hubConnection.invoke('Send', data);
      }
      this.messages.push(data);
  }

  ngOnInit() {
      this._hubConnection = new signalR.HubConnectionBuilder()
          .withUrl('https://localhost:44334/chat')
          .configureLogging(signalR.LogLevel.Information)
          .build();

      this._hubConnection.start().catch(err => console.error(err.toString()));

      this._hubConnection.on('Send', (data: any) => {
          const received = `Received: ${data}`;
          this.messages.push(received);
      });
  }

}
