import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SideNavOuterToolbarModule, SideNavInnerToolbarModule, SingleCardModule } from './layouts';
import { FooterModule, ResetPasswordFormModule, CreateAccountFormModule, ChangePasswordFormModule, LoginFormModule } from './shared/components';
import { AuthService, ScreenService, AppInfoService } from './shared/services';
import { UnauthenticatedContentModule } from './unauthenticated-content';
import { AppRoutingModule } from './app-routing.module';
import { ChatComponent } from './pages/chat/chat.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor, JwtInterceptor } from 'src/_helpers';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { DxButtonModule, DxCheckBoxModule, DxDataGridModule, DxDateBoxModule, DxDropDownButtonModule, DxFileUploaderModule, DxFormModule, DxHtmlEditorModule, DxListModule, DxSelectBoxModule, DxTextAreaModule, DxTextBoxModule } from 'devextreme-angular';
import { HomeComponent } from './pages/home/home.component';
import { ChatsComponent } from './shared/components/chat/chat.component';
import { SignUpComponent } from './shared/components/sign-up/sign-up.component';
import { FriendService } from './shared/services/friend.service';
import { ProfileComponent } from './pages/profile/profile.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import { CameraComponent } from './pages/camera/camera.component';
import { HomeVideoCallComponent } from './pages/home-video-call/home-video-call.component';
import { ParticipantsComponent } from './pages/participants/participants.component';
import { RoomsComponent } from './pages/rooms/rooms.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { DeviceSelectComponent } from './pages/settings/device-select/device-select.component';
import { FriendsComponent } from './pages/friends/friends.component';
import { ListFriendComponent } from './shared/components/list-friend/list-friend.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignUpComponent,
    ProfileComponent,
    CameraComponent,
    HomeVideoCallComponent,
    ParticipantsComponent,
    RoomsComponent,
    SettingsComponent,
    DeviceSelectComponent,
    FriendsComponent,
    TasksComponent,
  ],
  imports: [
    BrowserModule,
    SideNavOuterToolbarModule,
    SideNavInnerToolbarModule,
    SingleCardModule,
    FooterModule,
    ResetPasswordFormModule,
    CreateAccountFormModule,
    ChangePasswordFormModule,
    LoginFormModule,
    UnauthenticatedContentModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    InfiniteScrollModule,
    DxHtmlEditorModule,
    DxCheckBoxModule,
    DxButtonModule,
    DxTextBoxModule,
    DxTextAreaModule,
    DxDateBoxModule,
    DxFormModule,
    DxFileUploaderModule,
    DxSelectBoxModule,
    DxDataGridModule,
    DxListModule,
    DxDropDownButtonModule
  ],
  providers: [
    AuthService,
    ScreenService,
    AppInfoService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
