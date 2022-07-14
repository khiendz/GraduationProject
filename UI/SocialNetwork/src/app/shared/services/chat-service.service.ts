import { EventEmitter, Injectable, OnDestroy } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { environment } from 'src/environments/environment';
import { Message } from '../models/message.model';
import {HttpClient} from '@angular/common/http';
import { String } from 'typescript-string-operations';
import { Connect } from '../models/connect';

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
export class ChatServiceService implements OnDestroy {
  messageReceived = new EventEmitter<Message>();
  connectionEstablished = new EventEmitter<Boolean>();
  connectStart = new EventEmitter<Connect>();
  disconnect = new EventEmitter<Connect>();
  public listConnect: Connect[] = [];

  private connectionIsEstablished = false;
  public _hubConnection: HubConnection;

  constructor(public httpClient: HttpClient) {
    this.createConnection();
    this.registerOnServerEvents();
    this.startConnection();
  }
  ngOnDestroy(): void {

  }

  sendMessage(message: Message) {
    this._hubConnection.invoke('NewMessage', message);
  }

  connect(connect: Connect)
  {
    this._hubConnection.invoke('Connected',connect);
    console.log("Connected");
  }

  _disconnect(connect: Connect)
  {
    this._hubConnection.invoke('Disconnected',connect);
  }

  private createConnection() {
    this._hubConnection = new HubConnectionBuilder()
      .withUrl(`${environment.apiUrl}/MessageHub`)
      .build();
  }

  public startConnection(): void {
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
    this._hubConnection.on('ConnectStart', (data: any) => {
      this.connectStart.emit(data);
    });
    this._hubConnection.on('Disconnect', (data: any) => {
      this.disconnect.emit(data);
    });
  }



  public getSourceMessage(name: string, clientTo: string)
  {
    const requestUrl = String.Format(apiUrl.getFriend,name,clientTo);
    return this.httpClient.get(requestUrl);
  }
}
