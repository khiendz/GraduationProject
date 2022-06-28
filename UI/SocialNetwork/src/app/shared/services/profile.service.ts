import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { String } from 'typescript-string-operations';

const apiUrl = {
  getProfile : '/profiles/get/{0}',
  addProfile: '/profiles/create',
  detailsProfile: '/profiles/details/{0}',
  updateProfile : '/profiles/edit/{0}',
  deleteProfile : '/profiles/delete/{0}',
  exist : 'profiles/exist/{0}'
};
@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private httpClient: HttpClient) { }

  public get(idAccount: string)
  {
    const requestUrl = String.Format(apiUrl.getProfile,idAccount);
    return this.httpClient.get(requestUrl);
  }
  public addProfile(Profile: any)
  {
    const requestUrl = String.Format(apiUrl.addProfile);
    return this.httpClient.post(requestUrl,Profile);
  }
  public detailsProfile(idAccount:string)
  {
    const requestUrl = String.Format(apiUrl.detailsProfile,idAccount);
    return this.httpClient.get(requestUrl);
  }
  public updateProfile(Profile: any)
  {
    const requestUrl = String.Format(apiUrl.updateProfile,Profile.idAccount);
    return this.httpClient.post(requestUrl,Profile);
  }
  public deleteProfile(idAccount:string)
  {
    const requestUrl = String.Format(apiUrl.deleteProfile,idAccount);
    return this.httpClient.get(requestUrl);
  }
  public exist(idAccount:string)
  {
    const requestUrl = String.Format(apiUrl.exist,idAccount);
    return this.httpClient.get(requestUrl);
  }
}
