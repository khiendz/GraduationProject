import { Component } from '@angular/core';
import { Profile } from 'src/app/shared/models/profile.model';
import { ProfileService } from 'src/app/shared/services/profile.service';

@Component({
  templateUrl: 'profile.component.html',
  styleUrls: [ './profile.component.scss' ]
})

export class ProfileComponent {
  profile: Profile = new Profile();
  clientId: any;
  file: any;

  buttonOptions: any = {
    text: 'Register',
    type: 'default',
    useSubmitBehavior: true,
  };

  constructor(public profileService: ProfileService) {
    this.clientId = localStorage.getItem('currentUser')
    ? JSON.parse(localStorage.getItem('currentUser') || '')
    : [];
    profileService.detailsProfile(this.clientId.idAccount).subscribe((res: any) =>
    {
      debugger
      this.profile = res;
      document.getElementById("form-avatar")?.setAttribute('style', `background-image: url('${this.profile.avatar}')`);
    },error =>
    {
      debugger
    });
  }


  updateClick(e:any) {
    debugger
    this.profile.avatar = e.value[0].name;
  }

  submitForm()
  {
    debugger
    this.profileService.updateProfile(this.profile).subscribe();
  }
}
