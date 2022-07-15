import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import notify from 'devextreme/ui/notify';
import { ChangeModel } from 'src/app/shared/models/account.model';
import { Profile } from 'src/app/shared/models/profile.model';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { ProfileService } from 'src/app/shared/services/profile.service';

@Component({
  selector: 'app-setting-account',
  templateUrl: './setting-account.component.html',
  styleUrls: ['./setting-account.component.scss']
})
export class SettingAccountComponent implements OnInit {

  account: ChangeModel = new ChangeModel();
  clientId: any;
  file: any;
  paramSearch: any;
  stateSearch: boolean = false;
  id: string;
  name: string;

  buttonOptions: any = {
    text: 'Update',
    type: 'default',
    useSubmitBehavior: true,
  };

  constructor(private authen: AuthenticationService) {
    this.clientId = localStorage.getItem('currentUser')
    ? JSON.parse(localStorage.getItem('currentUser') || '')
    : [];

    document.getElementById("form-avatar")?.setAttribute('style', `background-image: url('${this.clientId.avatar}')`);
   }

  ngOnInit(): void {
  }

  changePassword(e: any)
  {
    this.account.Email = this.clientId.email;

    this.authen.change(this.account).subscribe((success: any) =>
    {
      if(success.status == "Success")
      {
        notify(success.message,"success",3000);
      }else
      {
        notify(success.message,"success",3000);
      }
    },(error: any) => {
      notify(error,"success",3000);
    });
  }

}
