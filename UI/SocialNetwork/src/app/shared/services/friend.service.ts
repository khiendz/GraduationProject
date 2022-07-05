import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { String } from 'typescript-string-operations';
import { Friend } from '../models/friend.model';

const apiUrl = {
  getFriend : '/friends/get/{0}',
  addFriedd : '/friends/create',
  detailsFriend: '/friends/details/{0}',
  updateFriend : '/friends/edit/{0}',
  deleteFriend : '/friends/delete/{0}/{1}',
  exist : 'friends/exist/{0}'
};
@Injectable({
  providedIn: 'root'
})
export class FriendService {

  constructor(public httpClient: HttpClient) { }

  public getFriend(idAccount: string)
  {
    const requestUrl = String.Format(apiUrl.getFriend,idAccount);
    return this.httpClient.get(requestUrl);
  }
  public addFriend(friend: any)
  {
    const requestUrl = String.Format(apiUrl.addFriedd);
    return this.httpClient.post(requestUrl,friend);
  }
  public detailsFriend(idAccount:string)
  {
    const requestUrl = String.Format(apiUrl.detailsFriend,idAccount);
    return this.httpClient.get(requestUrl);
  }
  public updateFriend(friend: any)
  {
    const requestUrl = String.Format(apiUrl.updateFriend,friend.idAccount);
    return this.httpClient.post(requestUrl,friend);
  }
  public deleteFriend(idAccount:string, idFriend: string)
  {
    const requestUrl = String.Format(apiUrl.deleteFriend,idAccount,idFriend);
    return this.httpClient.get(requestUrl);
  }
  public exist(idAccount:string)
  {
    const requestUrl = String.Format(apiUrl.exist,idAccount);
    return this.httpClient.get(requestUrl);
  }
}
