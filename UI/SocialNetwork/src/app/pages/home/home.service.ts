import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { String } from 'typescript-string-operations';

const apiUrl = {
  GetAll: '/newFeeds/get',
  GetDetailsId: '/newFeeds/details/{0}',
  Create: '/newFeeds/create',
  Edit: '/newFeeds/edit/{0}',
  Delete: '/newFeeds/delete/{0}',
  Exits: '/newFeeds/exists/{0}',
}

@Injectable({
  providedIn: 'root'
})

export class HomeService {

  constructor(
    private httpClient: HttpClient
  ) { }

  public GetAll(){
    return this.httpClient.get<any>(apiUrl.GetAll);
  }

  public GetDetail(id:string){
    const requestUrl = String.Format(apiUrl.GetDetailsId,id);
    return this.httpClient.get<any>(requestUrl);
  }

  public Create(newsFeed:any){
    const requestUrl = String.Format(apiUrl.Create);
    return this.httpClient.post<any>(requestUrl,newsFeed);
  }

  public Edit(newsFeed:any){
    const requestUrl = String.Format(apiUrl.Create,newsFeed.id);
    return this.httpClient.post<any>(requestUrl,newsFeed);
  }

  public Delete(id:string){
    const requestUrl = String.Format(apiUrl.Delete,id);
    return this.httpClient.get<any>(requestUrl);
  }

  public Exists(id:string){
    const requestUrl = String.Format(apiUrl.Exits,id);
    return this.httpClient.get<any>(requestUrl);
  }
}
