import { EventEmitter, Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { environment } from 'src/environments/environment';
import { Message } from '../models/message.model';
import {HttpClient} from '@angular/common/http';
import { String } from 'typescript-string-operations';

const apiUrl = {
  getFriend : '/messages/getlistmessage/{0}/{1}',
  addFriedd : '/messages/create',
  detailsFriend: '/messages/details/{0}',
  updateFriend : '/messages/edit/{0}',
  deleteFriend : '/messages/delete/{0}',
  exist : 'messages/exist/{0}'
};
@Injectable({
  providedIn: 'root'
})
export class ChatServiceService {
  messageReceived = new EventEmitter<Message>();
  connectionEstablished = new EventEmitter<Boolean>();

  private connectionIsEstablished = false;
  private _hubConnection: HubConnection;

  constructor(public httpClient: HttpClient) {
    this.createConnection();
    this.registerOnServerEvents();
    this.startConnection();
  }

  sendMessage(message: Message) {
    this._hubConnection.invoke('NewMessage', message);
  }

  private createConnection() {
    this._hubConnection = new HubConnectionBuilder()
      .withUrl('https://localhost:44334/MessageHub')
      .build();
  }

  private startConnection(): void {
    this._hubConnection
      .start()
      .then(() => {
        this.connectionIsEstablished = true;
        console.log('Hub connection started');
        this.connectionEstablished.emit(true);
      })
      .catch(err => {
        console.log('Error while establishing connection, retrying...');
        setTimeout( () => { this.startConnection(); }, 5000);
      });
  }

  private registerOnServerEvents(): void {
    this._hubConnection.on('MessageReceived', (data: any) => {
      this.messageReceived.emit(data);
    });
  }

  public getSourceMessage(name: string, clientTo: string)
  {
    debugger
    const requestUrl = String.Format(apiUrl.getFriend,name,clientTo);
    return this.httpClient.get(requestUrl);
  }
}
