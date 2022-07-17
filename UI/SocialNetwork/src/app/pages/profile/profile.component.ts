import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import {HttpClient} from '@angular/common/http'
import { Profile } from 'src/app/shared/models/profile.model';
import { ProfileService } from 'src/app/shared/services/profile.service';
import notify from 'devextreme/ui/notify';
import { LocalService } from 'src/app/shared/services/local.service';

@Component({
  templateUrl: 'profile.component.html',
  styleUrls: [ './profile.component.scss' ]
})

export class ProfileComponent {
  profile: Profile = new Profile();
  clientId: any;
  file: any;
  paramSearch: any;
  stateSearch: boolean = false;
  id: string;
  name: string;
  public files: any[];

  buttonOptions: any = {
    text: this.formatMessage('Update'),
    type: 'default',
    useSubmitBehavior: true,
  };

  constructor(public profileService: ProfileService, private route:ActivatedRoute, private http: HttpClient, private local: LocalService) {
    this.clientId = localStorage.getItem('currentUser')
    ? JSON.parse(localStorage.getItem('currentUser') || '')
    : [];

    this.route.queryParams.subscribe(params => {
      this.paramSearch = params['name'];
    });
    if(this.paramSearch)
    {
      this.stateSearch = !this.stateSearch;
      this.profileService.search(this.paramSearch).subscribe((data: any) =>
      {
        this.profile = data.result;
        this.id = this.profile.idAccount;
        this.name = this.profile.name;
        document.getElementById("form-avatar")?.setAttribute('style', `background-image: url('${this.profile.avatar}')`);
      });
    }else
    {
      profileService.detailsProfile(this.clientId.idAccount).subscribe((res: any) =>
      {
        this.profile = res;
        this.name = "profile";
        document.getElementById("form-avatar")?.setAttribute('style', `background-image: url('${this.profile.avatar}')`);
      },error =>
      {
      });
    }
  }

  updateClick(e:any) {
    this.profile.avatar = e.value[0].name;
  }

  submitForm()
  {
    this.profileService.updateProfile(this.profile).subscribe((success: any) =>
    {
      if(success.result == "Update profile success")
      {
        notify(success.result,"success",3000);
      }else
      {
        notify(success.result,"success",3000);
      }
    },(error: any) => {
      notify(error,"success",3000);
    });
  }

  formatMessage(key: any)
  {
    let data = this.local.formatMessage(key);
    return data;
  }
}
