import { Component, NgModule, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthService, IUser } from '../../services';
import { UserPanelModule } from '../user-panel/user-panel.component';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import { DxToolbarModule } from 'devextreme-angular/ui/toolbar';

import { Router } from '@angular/router';
import { FriendService } from '../../services/friend.service';
import { Friend } from '../../models/friend.model';
import { Profile } from '../../models/profile.model';
import { ProfileService } from '../../services/profile.service';
import { DxFilterBuilderModule, DxListModule, DxTextBoxModule } from 'devextreme-angular';
import { ChatServiceService } from '../../services/chat-service.service';
@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  @Output()
  menuToggle = new EventEmitter<boolean>();

  @Input()
  menuToggleEnabled = false;

  @Input()
  title!: string;

  uniqueID: string = '';
  clientId: any;
  nameSearch: string = '';
  user: IUser | null = { email: '' };
  stateSearch: boolean = false;
  friend: Friend[] = [];
  profile: Profile[] = [];
  userMenuItems = [{
    text: 'Profile',
    icon: 'user',
    onClick: () => {
      this.router.navigate([`/profile`]);
    }
  },
  {
    text: 'Logout',
    icon: 'runner',
    onClick: () => {
      this.authService.logOut();
    }
  }];

  constructor(private authService: AuthService, private router: Router,public friendService: FriendService, public profileService: ProfileService, chatService: ChatServiceService) {

    this.clientId = localStorage.getItem('currentUser')
    ? JSON.parse(localStorage.getItem('currentUser') || '')
    : [];
    this.uniqueID = this.clientId.user;
   }

  ngOnInit() {
    this.authService.getUser().then((e) => {
      this.user = e.data
      document.getElementById('user-image')?.setAttribute('style',`background: url("${e.data?.avatarUrl}") no-repeat #fff !important; background-size: cover !important;`);

    });

    this.profileService.getList().subscribe(
      (data: any) =>
      {
        this.profile = data;
      }
    )
  }

  toggleMenu = () => {
    this.menuToggle.emit();
  }

  focusSearch()
  {
    this.stateSearch = !this.stateSearch;
  }

  search(e: any)
  {
    this.router.navigate(['/tasks'], { queryParams: { name: e}}).then(() => {
      window.location.reload();
    });
  }

  openProfile(e:any)
  {
    this.router.navigate(['/profile'], { queryParams: { name: e}}).then(() => {
      window.location.reload();
    });
  }
}

@NgModule({
  imports: [
    CommonModule,
    DxButtonModule,
    UserPanelModule,
    DxToolbarModule,
    DxListModule,
    DxFilterBuilderModule,
    DxTextBoxModule
  ],
  declarations: [ HeaderComponent ],
  exports: [ HeaderComponent ]
})
export class HeaderModule { }
