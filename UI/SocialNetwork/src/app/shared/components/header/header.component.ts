import {
  Component,
  NgModule,
  Input,
  Output,
  EventEmitter,
  OnInit,
  NgZone,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthService, IUser } from '../../services';
import { UserPanelModule } from '../user-panel/user-panel.component';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import { DxToolbarModule } from 'devextreme-angular/ui/toolbar';

import { ActivatedRoute, Router } from '@angular/router';
import { FriendService } from '../../services/friend.service';
import { Friend } from '../../models/friend.model';
import { Profile } from '../../models/profile.model';
import { ProfileService } from '../../services/profile.service';
import {
  DxDropDownBoxModule,
  DxDropDownButtonModule,
  DxFilterBuilderModule,
  DxListModule,
  DxPopupModule,
  DxTextBoxModule,
} from 'devextreme-angular';
import { ChatServiceService } from '../../services/chat-service.service';
import { Notify } from '../../models/notify.model';
import { NotifyDisplay } from '../../models/notifyDisplay.model';
import { CallRequest } from '../../models/callRequest.model';
import { DxoPopupModule } from 'devextreme-angular/ui/nested';
const _profileSettings: any[] = [
  { value: 1, name: 'Dũng đã gửi một tin nhắn mới cho bạn', icon: 'user' },
  {
    value: 4,
    name: 'Messages',
    icon: 'email',
    badge: '5',
  },
  { value: 2, name: 'Friends', icon: 'group' },
  { value: 3, name: 'Exit', icon: 'runner' },
];
@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output()
  menuToggle = new EventEmitter<boolean>();

  @Input()
  menuToggleEnabled = false;
  profileSettings: any[];
  @Input()
  title!: string;
  notifySource: any[] = [];
  uniqueID: string = '';
  clientId: any;
  nameSearch: string = '';
  user: IUser | null = { email: '' };
  stateSearch: boolean = false;
  friend: Friend[] = [];
  profile: Profile[] = [];
  acceptButton: any;
  dennyButton: any;
  acceptAddButton: any;
  dennyAddButton: any;
  callState: boolean = false;
  notifyState: boolean = false;
  callRequest: CallRequest;
  userMenuItems = [
    {
      text: 'Profile',
      icon: 'user',
      onClick: () => {
        this.router.navigate([`/profile`]);
      },
    },
    {
      text: 'Logout',
      icon: 'runner',
      onClick: () => {
        this.authService.logOut();
      },
    },
  ];

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    public friendService: FriendService,
    public profileService: ProfileService,
    public chatService: ChatServiceService,
    private _ngZone: NgZone
  ) {
    const that = this;
    this.profileSettings = _profileSettings;
    this.clientId = localStorage.getItem('currentUser')
      ? JSON.parse(localStorage.getItem('currentUser') || '')
      : [];
    this.uniqueID = this.clientId.idAccount;
    this.chatService.getNotify(this.clientId.idAccount).subscribe((data: any) => {
      data.forEach((element: Notify) => {
        let notifyMore = new NotifyDisplay();
        notifyMore.id = element.id;
        notifyMore.icon = "user";
        notifyMore.name = element.message;
        notifyMore.value = JSON.stringify(element);
        notifyMore.bade = '1';
        this.notifySource.push(notifyMore);
      });
    });
    setTimeout(() => {
      this.subscribeToEvents();
    },3000);

    this.acceptButton = {
      icon: 'tel',
      type: 'success',
      text: 'Accept',
      onClick(e: any) {
        debugger
        setTimeout(() => {
          that.router.navigate(['/call-user'], { queryParams: { name: that.callRequest.roomName } }).then(() => {
            that.callState = false;
          });
        },2000);
      },
    };
    this.dennyButton = {
      text: 'Close',
      type: 'default',
      onClick(e: any) {
        that.chatService.pauseAudio();
        that.callState = false;
        that.chatService._callDisconnect(that.callRequest);
      },
    };
  }

  ngOnInit() {
    this.authService.getUser().then((e) => {
      this.user = e.data;
      document
        .getElementById('user-image')
        ?.setAttribute(
          'style',
          `background: url("${e.data?.avatarUrl}") no-repeat #fff !important; background-size: cover !important;`
        );
    });

    this.profileService.getList().subscribe((data: any) => {
      this.profile = data;
    });
  }

  toggleMenu = () => {
    this.menuToggle.emit();
  };

  focusSearch() {
    this.stateSearch = !this.stateSearch;
  }

  search(e: any) {
    this.router.navigate(['/tasks'], { queryParams: { name: e } }).then(() => {
      window.location.reload();
    });
  }

  openProfile(e: any) {
    this.router
      .navigate(['/profile'], { queryParams: { name: e } })
      .then(() => {
        window.location.reload();
      });
  }

  backHome() {
    this.router.navigate(['/home']);
  }

  teleCall(){
    console.log("sad");
    debugger
    setTimeout(() => {
      this.router.navigate(['/call-user'], { queryParams: { name: this.callRequest.roomName } }).then(() => {
      });
    },2000);
  }

  subscribeToEvents(): void {
    if (this.uniqueID == '') {
      return;
    }
    this.chatService.notifyReceived.subscribe((notify: Notify) => {
      this._ngZone.run(() => {
        if (notify.idfromTo === this.uniqueID) {
          debugger
          this.chatService.playAudio();
          let notifyMore = new NotifyDisplay();
          notifyMore.id = notify.id;
          notifyMore.icon = "user";
          notifyMore.name = notify.message;
          notifyMore.value = notify.id;
          notifyMore.bade = '1';
          this.notifySource.push(notifyMore);
          this.chatService.playAudio();
        }
      });
    });

    this.chatService.caller.subscribe((call: CallRequest) => {
      debugger
      this._ngZone.run(() => {
        if (call.toUser === this.uniqueID) {
          debugger
          this.chatService.playAudioCall();
          this.callState = !this.callState;
          this.callRequest = new CallRequest();
          this.callRequest.fromUser = call.fromUser;
          this.callRequest.toUser = call.toUser;
          this.callRequest.roomName = call.roomName;
        }
      });
    });

    this.chatService.callDisconnect.subscribe((call: CallRequest) => {
      this._ngZone.run(() => {
        let param = "";
        this.route.queryParams.subscribe(params => {
          param = params['name'];
        });
        if (call.roomName === param) {
          this.router.navigate(['/home']).then(() => this.chatService.pauseAudio());
        }
      });
    });
  }

  onItemClick(e:any)
  {
    debugger
    var dataTest: Profile = JSON.parse(e.itemData.value);

    console.log(dataTest);
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
    DxTextBoxModule,
    DxDropDownButtonModule,
    DxPopupModule
  ],
  declarations: [HeaderComponent],
  exports: [HeaderComponent],
})
export class HeaderModule {}
